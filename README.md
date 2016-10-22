[![Build Status](https://travis-ci.org/andela-foladeji/inverted-index.svg)](https://travis-ci.org/andela-foladeji/inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-foladeji/inverted-index/badge.svg?branch=develop)](https://coveralls.io/github/andela-foladeji/inverted-index?branch=develop)

# Inverted Index
Elasticsearch uses a structure called an inverted index, which is designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

## Features of the application
- Allow upload of json files of the format below
```
[
    {
        "title": "This is a sample title",
        "text": "And this is a sample text"
    }
]
```
- Indexing of uploaded files
- Searching of each indexed files and all indexed files

## How to use
The application can be accessed on heroku via [https://inverted-index.herokuapp.com](https://inverted-index.herokuapp.com).
It can also be used locally by following the steps below

1. Clone the repository 
```
git clone https://github.com/andela-foladeji/inverted-index.git
```
1. Move into the repository directory 
```
cd inverted-index
```
1. Run npm install to install all the dependencies (you must have installed [Nodejs](nodejs.org))
    ### Dependencies
    - gulp
    - coveralls
    - karma
    - jshint
    - jasmine-core
```
npm install
```
1. Start the application by executing the command below
```
npm start
```

## More information
- [Inverted Index - Wikipedia] (https://en.wikipedia.org/wiki/Inverted_index)
- [Inverted Index](https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html)