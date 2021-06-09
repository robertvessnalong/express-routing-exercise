const { json } = require('body-parser');
const express = require('express');
const { values } = require('methods');
const { array } = require('prop-types');
const errorHanlder = require('./error');

const app = express();

app.get('/mean', (req, res, next) => {
  let answer = 0;
  try {
    if (!req.query.nums)
      throw new errorHanlder('Nums was not included in parameters', 400);
    else {
      const nums = req.query.nums.split(',');
      console.log(nums.length);
      for (let num of nums) {
        if (/[a-zA-Z]/.test(num)) {
          throw new errorHanlder('Only enter in numbers', 400);
        } else {
          answer += parseInt(num);
        }
      }
      return res.json({
        operation: 'mean',
        value: answer / nums.length,
      });
    }
  } catch (e) {
    next(e);
  }
});

app.get('/median', (req, res, next) => {
  let arr = [];
  try {
    if (!req.query.nums)
      throw new errorHanlder('Nums was not included in parameters', 400);
    else {
      const nums = req.query.nums.split(',');
      for (let num of nums) {
        if (/[a-zA-Z]/.test(num)) {
          throw new errorHanlder('Only enter in numbers', 400);
        } else {
          arr.push(parseInt(num));
        }
      }
    }
    const sort = arr.sort();
    const mid = Math.ceil(arr.length / 2);

    const median =
      arr.length % 2 == 0 ? (sort[mid] + sort[mid - 1]) / 2 : sort[mid - 1];
    return res.json({
      operation: 'median',
      median,
    });
  } catch (e) {
    next(e);
  }
});

app.get('/modes', (req, res, next) => {
  let arr = [];
  let mode = {};
  try {
    if (!req.query.nums)
      throw new errorHanlder('Nums was not included in parameters', 400);
    else {
      const nums = req.query.nums.split(',');
      for (let num of nums) {
        if (/[a-zA-Z]/.test(num)) {
          throw new errorHanlder('Only enter in numbers', 400);
        } else {
          arr.push(parseInt(num));
        }
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (!mode[arr[i]]) mode[arr[i]] = 0;
      mode[arr[i]] += 1;
    }
    return res.json({
      operation: 'modes',
      mode,
    });
  } catch (e) {
    next(e);
  }
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, function () {
  console.log('App on port 3000');
});
