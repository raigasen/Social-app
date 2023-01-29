const mongoCollection = require('../config/mongoCollections');
const users = mongoCollection.users;
const comments = mongoCollection.comments;
let { ObjectId } = require('mongodb');





module.exports = {
    addLikeToComments: async (cmntId, usrId) => {
      
        if (!usrId) {
          throw "usrId parameter has to be provided";
        }
        if (typeof usrId !== 'string' || usrId.trim().length === 0) {
          throw "usrId should be a string and not an empty string";
        }
        usrId = usrId.trim();
    
        if (!ObjectId.isValid(usrId)) {
          throw "usrId is not a valid ObjectId";
        }
  
        
        const usrCollection = await users();
    
        const usr = await usrCollection.findOne({ _id: ObjectId(usrId) });
    
        if (usr === null) {
          throw "No user with menitioned id : "+usrId+" exists ";
        }

        if (!cmntId) {
          throw "commentId parameter has to be provided";
        }
        if (typeof cmntId !== 'string' || cmntId.trim().length === 0) {
          throw "commentId should be a string and not an empty string";
        }
        cmntId = cmntId.trim();
  
       
        if (!ObjectId.isValid(cmntId)) {
          throw "commentId is not a valid ObjectId";
        }
        const commentsCollection = await comments();
        const commentIdentified = await commentsCollection.findOne({ _id: ObjectId(cmntId)});
        
    
        if (commentIdentified == null) {
          throw "Provided comment could'nt be found";
        }
    
        let likesArray = commentIdentified.likes;
        let dislikesArray = commentIdentified.dislikes;
  
       
        if (likesArray.indexOf(usrId) != -1) {
          throw "The user has already liked or disliked the comment";
        }
    
        if (dislikesArray.indexOf(usrId) != -1) {
          throw "The user has already liked or disliked the comment";
        }
    
        const updateCommentInfo = await commentsCollection.updateOne({ _id: ObjectId(cmntId) }, { $push: { likes: usrId }  });
    
        if (updateCommentInfo.modifiedCount === 0) {
          throw "Unable to like the comment succesfully";
    
        }
    
        return { "usrId": usrId, "liked": true }; 
    
      },
      addDisLikeToComments: async (cmntId, usrId) => {
      
        if (!usrId) {
          throw "usrId parameter has to be provided";
        }
        if (typeof usrId !== 'string' || usrId.trim().length === 0) {
          throw "usrId should be a string and not an empty string";
        }
        usrId = usrId.trim();
    
        if (!ObjectId.isValid(usrId)) {
          throw "usrId is not a valid ObjectId";
        }
  
        
        const usrCollection = await users();
    
        const usr = await usrCollection.findOne({ _id: ObjectId(usrId) });
    
        if (usr === null) {
          throw "No user with menitioned id : "+usrId+" exists ";
        }

        if (!cmntId) {
          throw "commentId parameter has to be provided";
        }
        if (typeof cmntId !== 'string' || cmntId.trim().length === 0) {
          throw "commentId should be a string and not an empty string";
        }
        cmntId = cmntId.trim();
  
       
        if (!ObjectId.isValid(cmntId)) {
          throw "commentId is not a valid ObjectId";
        }
        const commentsCollection = await comments();
        const commentIdentified = await commentsCollection.findOne({ _id: ObjectId(cmntId)});
        
    
        if (commentIdentified == null) {
          throw "Provided comment could'nt be found";
        }
    
        let likesArray = commentIdentified.likes;
        let dislikesArray = commentIdentified.dislikes;
  
       
        if (likesArray.indexOf(usrId) != -1) {
          throw "The user has already liked or disliked the comment";
        }
    
        if (dislikesArray.indexOf(usrId) != -1) {
          throw "The user has already liked or disliked the comment";
        }
    
        const updateCommentInfo = await commentsCollection.updateOne({ _id: ObjectId(cmntId) }, { $push: { dislikes: usrId }  });
    
        if (updateCommentInfo.modifiedCount === 0) {
          throw "Unable to dislike the comment succesfully";
    
        }
    
        return { "usrId": usrId, "disliked": true }; 
    
      }
}