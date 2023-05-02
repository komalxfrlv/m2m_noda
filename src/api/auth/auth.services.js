const { db } = require('../../utils/db');
const { hashToken } = require('../../utils/hashToken');
var http = require('http');
var querystring = require('querystring');


// used when we create a refresh token.
function addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId
    },
  });
}

// used to check if the token sent by the client is in the database.
function findRefreshTokenById(id) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

// soft delete tokens after usage.
function deleteRefreshToken(id) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

function revokeTokens(userId) {
  return db.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}

function postEmailReq(email, content) {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'email' : email,
      'content': content
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'localhost',
      port: process.env.MAIL_PORT,
      path: '/api/mail',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });
console.log(post_data)
  // post the data
  post_req.write(post_data);
  post_req.end();

}


module.exports = {
  postEmailReq,
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens
};