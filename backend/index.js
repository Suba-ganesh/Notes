require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Note = require("./models/note.model"); 
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const express = require("express");
const cors = require("cors");
const { error } = require("console");

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

mongoose
    .connect(config.connectionstring, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

app.get("/", (req, res) => {
    res.json({ data: "hi" });
});


app.post("/createaccount", async (req, res) => {
    try {
        console.log("Received data:", req.body); // Debugging

        const { fullName, email, password } = req.body;

        if (!fullName) return res.status(400).json({ error: true, message: "Fullname is required" });
        if (!email) return res.status(400).json({ error: true, message: "E-mail is required" });
        if (!password) return res.status(400).json({ error: true, message: "Password is required" });

        const isUser = await User.findOne({ email });

        if (isUser) {
            console.log("User already exists:", isUser);
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        const user = new User({ fullName, email, password });

        await user.save();
        console.log("User saved successfully:", user);

        res.status(201).json({ success: true, message: "Account created successfully" });
    } catch (error) {
        console.error("Error while saving user:", error);
        res.status(500).json({ error: true, message: "Internal Server Error", details: error.message });
    }
});

app.post("/login",async (req,res)=> {

    const {email, password} = req.body;

    if(!email) {
        return res.status(400).json( {message: "Email is required"})
    }

    if(!password) {
        return res.status(400).json ({message: "Password is required"})
    }

    const userInfo = await User.findOne ({email: email});

    if (!userInfo) {
        return res.status(400).json({message:"user not found"});
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = {user: userInfo};
        const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn:"36000m"
        });

        return res.json ({
            error: false,
            message:"Login successful",
            email,
            accessToken,
        });

    } else {
        return res.status (400).json({
            error:true,
            message:"Invalid Credentials"
        })
    }
})

app.get("/get-user", authenticateToken,async (req,res)=> {

    const {user} = req.user;

    const isUser = await User.findOne({_id:user._id})


    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user:{fulName:isUser.fullName,email:isUser.email,"id":isUser._id, createdon:isUser.createdOn},
        message:"",
    })
})

app.post("/add-note", authenticateToken, async (req, res) => {
  const {title,content, tags} = req.body;

  const user = req.user

  if(!title) {
    return res.status(400).json( {message: "title is required"})
}

if(!content) {
    return res.status(400).json( {message: "content is required"})
}

try {
    const note = new Note({
        title,
        content,
        tags: tags || [],
        userId: user._id,
    });

    await note.save();

    return res.json({
        error: false,
        note,
        message:"Note added successfully",
    })
} catch (error) {
    console.log(error)
    return res.status(500).json({
        error:true,
        message: "Internal Server Error",
    });
}
});

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const user = req.user;

    if (!title && !content && !tags && isPinned === undefined) {
        return res.status(400).json({ 
            error: true, 
            message: "At least one field (title, content, tags, or isPinned) must be provided for update."
        });
    }

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({ error: true, message: "Invalid note ID" });
    }

    try {
        console.log("User ID:", user._id);
        console.log("Note ID:", noteId);

        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        // Update only provided fields
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned !== undefined) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });

    } catch (error) {
        console.error("Error updating note:", error);
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
});

app.get("/get-all-notes/", authenticateToken, async (req, res) => {
    const user = req.user

    try {
        const notes = await Note.find({user_Id:user._id}).sort({isPinned:-1});

        return res.json({
        error:false,
        notes,
        message: "all notes are retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error:true,
            message:"internal Server error "
        })
    }
});

app.delete("/delete/:noteId", authenticateToken, async (req, res) => {

    const noteId = req.params.noteId;
    const user = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });


        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });


        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    } catch (error) {
        console.error("Error updating note:", error);
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
});

app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => { 
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({ error: true, message: "Invalid note ID" });
    }

    try {
        console.log("User ID:", user._id);
        console.log("Note ID:", noteId);

        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        // Update only provided fields
        if (isPinned !== undefined) note.isPinned = isPinned || false;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });

    } catch (error) {
        console.error("Error updating note:", error);
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
});


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;