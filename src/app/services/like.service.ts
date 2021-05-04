import { Injectable } from "@angular/core";
import { ILikes, Likes } from "app/shared/model/userProfile/likes.model";
import { PostPublicityService } from "./post-publicity.service";
import { ImagePost } from "app/shared/model/userProfile/image.post";
import { IPostComment, PostComment } from "app/shared/model/userProfile/comment.model";
import * as moment from 'moment';
import { FullCommentDetails } from "app/shared/model/userProfile/FullCommentDetails.model";
import { ResolveEnd } from "@angular/router";
import { resolve, reject } from "q";

@Injectable({
    providedIn: 'root'
})

export class LikeService {
    likedPostDetails: ILikes;
    postCommentDetails: IPostComment;
    map = new Map();
    mapComment = new Map();
    mapCommentUsers = new Map();
    mapPostComments = new Map();
    temporyUsers = new Map<any, any>();
    li: any[] = [];
    FullCommentDetails = new FullCommentDetails();




    constructor(
        private publicityService: PostPublicityService
    ) {
        this.likedPostDetails = new Likes();
    }



    like(postId, userId) {
        this.likedPostDetails.postId = postId;
        this.likedPostDetails.likedUserId = userId;
        return new Promise((resolve, reject) => {

            this.publicityService.generateLike(this.likedPostDetails).subscribe(
                res => {
                    // //console.log("Like successful" + JSON.stringify(res.body));
                    resolve(res.body);
                    // this.updateLikes(res.body, postId);
                    // service.unsubscribe()
                },
                err => {
                    //  //console.log(JSON.stringify(err))
                    reject(err)
                }
            );
        });

    }


    clearAllData(){





    }


    saveEditedComment(comment:PostComment){
        return new Promise((resolve,reject)=>{
            this.publicityService.generateEditCommit(comment).subscribe(
                res=>{
                    resolve(res.body)
                },err=>{
                    reject(err)
                }
            )
        })
    }

    deleteComment(comment){
        return new Promise((resolve,reject)=>{
            this.publicityService.deleteComment(comment.id).subscribe(
                res=>{
                    resolve(res.body)
                },err=>{
                    reject(err)
                }
            )
        })
    }


    savePostComment(comment: PostComment, userId) {

        return new Promise((resolve, reject) => {

            this.publicityService.generateComment(comment).subscribe(
                res => {
                    //console.log('success comment ' + JSON.stringify(res.body));
                    resolve(res.body);
                    // resolve( this.getAllComments(comment.postId));
                },
                err => {
                    //console.log(JSON.stringify(err));
                    reject(err)
                }
            );
        });
    }

    // getAllComments(postId) {

    // return new Promise((resolve, reject) => {
    //     this.publicityService.getAllComments(postId).subscribe(
    //         res => {
    //         //    //console.log("Get All Comments "+JSON.stringify(res.body));

    //         //  this.getUserDetailsForComments(res.body, postId).then(res=>{
    //         //     resolve(res);
    //         //  });

    //          resolve(res.body);

    //         },
    //         err => {
    //             //console.log("Error in getting comments user details"+JSON.stringify(err));
    //             reject(err);

    //         }
    //     );
    //     });
    // }


    // getUserDetailsForComments(commentFacts: FullCommentDetails, postId) {

    //     return new Promise((resolve, reject) => {
    //     this.publicityService.getUsersOfComments(commentFacts.commentPersons).subscribe(
    //         moreUserDetails => {
    //             this.FullCommentDetails = commentFacts;
    //             if(this.mapCommentUsers.size === 0){
    //                 this.mapCommentUsers = moreUserDetails.body;
    //             }else{

    //                 ////console.log("more usersssssssssssssss "+ JSON.stringify(Object.keys(this.temporyUsers)));

    //                 Object.keys(moreUserDetails.body).forEach(newkey =>{

    //                     this.mapCommentUsers[newkey] = this.temporyUsers[newkey];

    //                 })


    //             }

    //             resolve(this.mapCommentUsers);
    //           //  //console.log("More user details" +JSON.stringify(this.mapCommentUsers))
    //             // this.FullCommentDetails = commentFacts;
    //         ////    this.mapComment = commentFacts.comments;

    //         /////     this.li.push(this.mapCommentUsers);
    //         /////     this.li.push(this.mapComment);
    //            //  //console.log("More comments details" +JSON.stringify(this.li));

    //         //     resolve( this.li);

    //           // this.updateNumberOfCommemts(this.mapComment, postId);
    //        //     //console.log("More comments details" +JSON.stringify(this.mapComment))
    //         },
    //         err => {
    //             reject( err);
    //             //console.log('No Comments in service '+JSON.stringify(err));
    //         }
    //     );
    //     });

    // }

    getUserDetailsForComments(postId,commentFacts?: FullCommentDetails) {

        return new Promise((resolve, reject) => {
            this.publicityService.getUsersOfComments(commentFacts.commentPersons).subscribe(
                moreUserDetails => {

                    this.FullCommentDetails = commentFacts;

                    if (this.mapCommentUsers.size === 0) {
                        this.mapCommentUsers = moreUserDetails.body;
                    } else {

                        ////console.log("more usersssssssssssssss "+ JSON.stringify(Object.keys(this.temporyUsers)));

                        Object.keys(moreUserDetails.body).forEach(newkey => {

                            this.mapCommentUsers[newkey] = moreUserDetails.body[newkey];

                        })


                    }

                    resolve(this.mapCommentUsers);


                    // //console.log("in preview "+ JSON.stringify(this.mapCommentUsers))

                    // this.mapPostComments = res.comments;
                    // this.ImagePost.numberOfComments = this.mapPostComments[this.ImagePost.id].length;
                    // this.CommentsAmount = this.mapPostComments[this.ImagePost.id].length;
                    // //console.log('comments set size'+res.comments);




                },
                err => {
                    reject(err);
                    //console.log('No Comments in service ' + JSON.stringify(err));
                }
            );
        });

    }

    getAllComments(postId, nextPageNumber?) {

        return new Promise((resolve, reject) => {
            this.publicityService.getAllComments(postId, nextPageNumber).subscribe(
                res => {

                    this.FullCommentDetails.commentPersons = res.body.commentPersons;


                    if (!this.mapPostComments[postId]) {

                        this.mapPostComments[postId] = res.body.comments[postId]
                        //  alert(JSON.stringify(this.mapComment))
                    } else {

                        let com: IPostComment[];
                        com = res.body.comments[postId];
                        let exists = false;
                        this.mapPostComments[postId].forEach((item, index) => {
                            com.forEach(element => {
                                if (element.id === item.id) {
                                    exists = true
                                }
                            })

                            if (!exists) {
                                com.push(item)
                            }

                        })

                        this.mapPostComments[postId] = com;


                    }
                    this.FullCommentDetails.comments = this.mapPostComments;


                    resolve(this.FullCommentDetails)
                },
                err => {
                    //console.log("Error in getting comments user details" + JSON.stringify(err));
                    reject(err);

                }
            );
        });
    }





}