const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send({
        msg: "this is api end Point"
    });
})

const { PostModel } = require("./model/post.model");
const { dbconnection } = require("./config/db");
app.post("/post", async (req, res) => {
    const { name, description, category, image, location, postedAt, price } = req.body;
    const new_post = new PostModel({ name, description, category, image, location, postedAt, price })
    try {
        await new_post.save()
        return res.send({
            msg: "post successfully added"
        })
    }
    catch (err) {
        console.log(err)
        res.send({
            msg: "something went wrong in adding post"
        })
    }
})

app.delete("/post/:postID", async (req, res) => {
    const { postID } = req.params
    try {
        const post = await MoviesModel.findOneAndDelete({ _id: postID })
        if (post) {
            res.send({
                msg: "post deleted successfully"
            })
        }
        else {
            res.send({
                msg: "post not found"
            })
        }
    }
    catch (err) {
        console.log(err)
        res.send({
            msg: "something went wrong, please try again later"
        })
    }
})


app.get("/browse", async (req, res) => {
    try {
        const { name, category } = req.query;
        if (category) {
            const posts = await PostModel.find({ category: { $regex: category } })
            res.send({ posts })
        }
        else if (name) {
            const posts = await PostModel.find({ name: { $regex: name } })
            res.send({ posts })
        }
        else {
            const posts = await PostModel.find()
            res.send({ posts })
        }
    }
    catch (err) {
        console.log(err)
        res.send({
            msg: "something went wrong, of fetching the posts"
        })
    }
})


app.listen(4000, async () => {
    try {
        await dbconnection;
        console.log("connected db successfully");
    } catch (error) {
        console.log(error);
    }
    console.log('server is started at 4000');
})