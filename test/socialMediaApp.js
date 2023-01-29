let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
chai.use(chaiHttp);

var Cookies;
var req;

describe('Users', () => {
 
  var token = ""
  var postId = ""
  var commentId = ""

  /*
  * Test the /POST new-post without sign in
  */
 
describe('/POST new-post', () => {
  it('It should not allow the user to post without sign in', (done) => {
      let post = {
        "user" : "srinivas",
        "title": "new_post_from_srinivas"
    }
    chai.request('http://localhost:4000')
        .post('/posts/new-post')
        .send(post)
        .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              res.body.should.have.property('error').eql('Please sign in to continue');
          done();
        });
  });

});

  
  /* Test the /POST login
  */
 
  describe('/POST login', () => {
      it('It should allow the user to login ', (done) => {
          let user = {
            "email": "ssrimant@gmail.com",
            "password" : "Srinivas@Fall2021"
        }
        chai.request('http://localhost:4000')
            .post('/login')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('user');
                  res.body.should.have.property('token');
                  token=res.body.token;
                  
              done();
            });
      });

  });

/*
  * Test the /POST new-post
  */
describe('/POST new-post', () => {

  
  it('It should allow the user to post new ones', (done) => {
      let post = {
        "user" : "srinivas",
        "title": "new_post_from_srinivas"
    }

    chai.request('http://localhost:4000')
        .post('/posts/new-post')
        .set({ "Authorization": token })
        .send(post)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('post');
              postId=res.body.post._id;
          done();
        });
  });

});

/*
  * Test the /POST get-posts
  */
 
describe('/GET posts', () => {
  it('It fetch all posts made by a particular user', (done) => {
      
    chai.request('http://localhost:4000')
        .get('/posts')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('posts');
          done();
        });
  });

});

/*
  * Test the /POST post-comment
  */
describe('/POST post-comment', () => {

  
  it('It should allow the user to post the comment for the provided post id', (done) => {
      let comment = {
        "post" : postId,
        "commentTitle" : "New Comment from Sri"
    }

    chai.request('http://localhost:4000')
        .post('/posts/comment')
        .set({ "Authorization": token })
        .send(comment)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('comment');
              commentId=res.body.comment._id;
          done();
        });
  });

});

/*
  * Test the /POST heart-comment
  */
describe('/POST heart-comment', () => {

  
  it('It should allow the user to heart a comment for the provided comment id', (done) => {
      let comment = {
        "user" : "srinivas",
        "comment": commentId
    }

    chai.request('http://localhost:4000')
        .post('/comments/heart')
        .set({ "Authorization": token })
        .send(comment)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('hearts');
          done();
        });
  });

});


/*
  * Test the /POST get-single-comment
  */
describe('/POST get-single-comment', () => {

  
  it('It should allow the user to fetch the comment for the provided comment id', (done) => {
      let comment = {
        "comment" : commentId
    }

    chai.request('http://localhost:4000')
        .post('/comments/')
        .set({ "Authorization": token })
        .send(comment)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('comment');
          done();
        });
  });

});


/*
  * Test the /POST edit-comment
  */
describe('/POST edit-comment', () => {

  
  it('It should allow the user to post the comment for the provided post id', (done) => {
      let comment = {
        "comment" : commentId,
        "commentTitle" : "Edit Comment from Sri"
    }

    chai.request('http://localhost:4000')
        .post('/comments/edit')
        .set({ "Authorization": token })
        .send(comment)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('comment');
              
          done();
        });
  });

});

/*
  * Test the /POST delete-post
  */
describe('/POST delete-post', () => {

  
  it('It should allow the user to delete post for the provided post id', (done) => {
      let post = {
        "user" : "srinivas",
        "post": postId
    }

    chai.request('http://localhost:4000')
        .delete('/posts/delete')
        .set({ "Authorization": token })
        .send(post)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Post deleted successfully!');
          done();
        });
  });

});


/*
  * Test the /GET logout
  */
 
describe('/POST logout', () => {
  it('it should logout the user', (done) => {
   
    chai.request('http://localhost:4000')
        .post('/logout')
        .set({ "Authorization": token })
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('You have logged out');
          done();
        });
  });
});

});