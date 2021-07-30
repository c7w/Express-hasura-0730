import express, {
  Router
} from "express";
import client from "../configs/graphql_client.js";
import {
  gql
} from "graphql-request";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const get_user = await client.request(
      gql `
        query get_user {
          user {
            email
            gender
            username
          }
        }
      `
    );
    let data = [];
    for (let item of get_user.user) {
      data.push(item.username);
    }
    return res.status(200).send(data);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/", async (req, res) => {
  const INSERT_USER = gql`mutation MyMutation($username: String!, $email: String, $gender: String) { \
    insert_user(objects: {
      username: $username,
      email: $email,
      gender: $gender
    }) {
      affected_rows
    }
  }`;
  try {
    const insert_user = await client.request(INSERT_USER, req.body);
    return res.status(200).send(insert_user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.put("/:user/", async (req, res) => {
  try {
    const PUT_USER = gql`mutation MyMutation($_set: user_set_input = {}, $_eq: String = "") {
      update_user(where: {username: {_eq: $_eq}}, _set: $_set) {
        affected_rows
      }
    }`;
    const put_user = await client.request(PUT_USER, { _eq: req.params.user, _set: req.body });
    return res.status(200).send(put_user);
  } catch (error) {
    return res.status(400).send(err); 
  }
});

router.delete("/:user/", async (req, res) => {
  try {
    const DELETE_USER = gql`mutation MyMutation($_eq: String = "") {
      delete_user(where: {username: {_eq: $_eq}}) {
        affected_rows
      }
    }`;
    const delete_user = await client.request(DELETE_USER, { _eq: req.params.user });
    return res.status(200).send(delete_user);
  } catch (error) {
    return res.status(400).send(err); 
  }
});

router.get("/:user/", async (req, res) => {
  try {
    const GET_ARTICLE = gql`query MyQuery($_eq: String = "") {
      user(where: {username: {_eq: $_eq}}) {
        articles {
          title
        }
        gender
        email
      }
    }`;
    const get_article = await client.request(GET_ARTICLE, { _eq: req.params.user });
    return res.status(200).send(get_article);
  } catch (error) {
    return res.status(400).send(err); 
  }
});

router.post("/:user/", async (req, res) => {
  try {
    const POST_ARTICLE_1 = gql`query MyQuery($_eq1: String = "") {
      user(where: {username: {_eq: $_eq1}}) {
        id
      }
    }`;
    const post_article_1 = await client.request(POST_ARTICLE_1, { _eq1: req.params.user });
    const id = post_article_1["user"][0]["id"];
    const POST_ARTICLE = gql `mutation MyMutation($title: String = "", $author: uuid = "") {
      insert_article(objects: {author: $author, title: $title}) {
        affected_rows
      }
    }`;
    const post_article = await client.request(POST_ARTICLE, {author: id, title: req.body.title})
    return res.status(200).send(post_article)
  } catch (error) {
    return res.status(400).send(err); 
  }
});

export default router;