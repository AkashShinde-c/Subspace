const express = require("express");
const axios = require("axios");
const _ = require("lodash");
const {
  fetchData,
  longest_title,
  privacyFilter,
  unique_blogs_filter,
  search,
} = require("../utils/utils");

const memoizedFunction = _.memoize(fetchData, () => "blogData", 12000);
const memoized_longest_title = _.memoize(longest_title, () => "", 12000);
const memoized_privacy_filter = _.memoize(privacyFilter, () => "", 12000);
const memoized_blogs_filter = _.memoize(unique_blogs_filter, () => "", 12000);
const memoizedSearch = _.memoize(search, (...args) =>
  _.values(args).join("_")
);

const handleErrorResponse = (res, message) => {
  console.error(message);
  res.status(500).json({ error: message });
};

const get_blog_data = async (req, res) => {
  try {
    const blogData = await memoizedFunction();

    if (!blogData) {
      return handleErrorResponse(
        res,
        "Invalid blog data received from the third-party API."
      );
    }

    const long_title = memoized_longest_title(blogData);
    const blogs_with_privacy = memoized_privacy_filter(blogData);
    const unique_blogs = memoized_blogs_filter(blogData);

    res.status(200).json({
      no_of_blogs: _.size(blogData),
      long_title: long_title,
      blogs_with_privacy: blogs_with_privacy,
      unique_blogs: unique_blogs,
    });
  } catch (error) {
    handleErrorResponse(
      res,
      "An error occurred while fetching or processing blog data."
    );
  }
};

const search_blog = async (req, res) => {
  const query = req.query.query || "";

  try {
    const blogData = await memoizedFunction();
    if (!blogData) {
      return handleErrorResponse(
        res,
        "Invalid blog data received from the third-party API."
      );
    }

    const search_result = memoizedSearch(blogData, query);
    res.status(200).json({ search_result: search_result });
  } catch (error) {
    handleErrorResponse(
      res,
      "An error occurred while fetching or processing blog data."
    );
  }
};

module.exports = { get_blog_data, search_blog };
