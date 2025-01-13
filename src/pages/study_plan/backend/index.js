const express = require('express');
const bodyParser = require('body-parser');
const {configuration, OPENAIApi} = require('openai');

const app = express();