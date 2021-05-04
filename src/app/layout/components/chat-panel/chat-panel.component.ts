import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { ChatPanelService } from 'app/layout/components/chat-panel/chat-panel.service';
import { ChatService } from 'app/services/chat.service';
import { IChat, Chat } from 'app/shared/model/chats/chat.model';
import { IUser, User, Principal } from 'app/core';
import { PostPublicityService } from 'app/services/post-publicity.service';
import { MessagingService } from 'app/services/messaging.service';
import { MessageTestService } from 'app/services/messageTest.service';
import { ICreator, Creator } from 'app/shared/model/userProfile/creator.model';
import { MessageService } from 'app/services/message.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { UserServiceService } from '@fuse/services/user-service.service';




@Component({
    selector: 'chat-panel',
    templateUrl: './chat-panel.component.html',
    styleUrls: ['./chat-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatPanelComponent implements OnInit, AfterViewInit, OnDestroy {


    contacts: any[] = [];
    usersWithToken;

    search: boolean;
    usern: IUser;
    loggedUserDetails: ICreator;
    sendMessageDetails: IChat;
    mapCommentUsers = new Map<any, any>();
    chat: any;
    selectedContact: any;
    sidebarFolded: boolean;
    user: any;
    allChats: any[] = [];
    tempAllChats: any[] = [];
    nextPageNumber: number
    nextUsePageNumber: number;
    fuseConfig: any;
    selectedThemeDark: boolean;
    searchResult = new Map();
    @ViewChild('replyForm')
    set replyForm(content: NgForm) {
        this._replyForm = content;
    }

    @ViewChild('replyInput')
    set replyInput(content: ElementRef) {
        this._replyInput = content;
    }

    @ViewChildren(FusePerfectScrollbarDirective)
    private _fusePerfectScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    // Private
    private _chatViewScrollbar: FusePerfectScrollbarDirective;
    private _replyForm: NgForm;
    private _replyInput: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChatPanelService} _chatPanelService
     * @param {HttpClient} _httpClient
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _chatPanelService: ChatPanelService,
        private _httpClient: HttpClient,
        private _fuseSidebarService: FuseSidebarService,
        private chatService: ChatService,
        private principal: Principal,
        private postPublicityService: PostPublicityService,
        private notificationService: MessagingService,
        private messageService: MessageService,
        private messageTestService: MessageTestService,
        private userService: UserServiceService,
        private _fuseConfigService: FuseConfigService
    ) {
        // Set the defaults
        this.selectedContact = null;
        this.sidebarFolded = true;
        this.search = true;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.messageTestService.notificationAnnouncedAsCreator$.subscribe(res => {

            if (res.topic === "GET_INITIAL_DATA") {

                this.loggedUserDetails = res.message;
                //  alert("logged user details" + JSON.stringify(this.loggedUserDetails.userProfilePicture.imageUrl));
            }
        });


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.searchResult = null;
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
                if (
                    this.fuseConfig.colorTheme === 'theme-yellow-dark'
                ) {
                    this.selectedThemeDark = true
                } else {

                    this.selectedThemeDark = false
                }
            });
 

        this.nextPageNumber = 1;
        this.nextUsePageNumber = 0;
        this.notificationService.currentMessage.subscribe(res => {


            ////console.log("in the chat : " + JSON.stringify(res.message.data.userId))
            //console.log("in the chat : " + JSON.stringify(res.message.data.userId))
            let x = new Chat();
            x.receivedPeronId = this.user.id;
            x.message = res.message.notification.body;
            x.sendPersonId = res.message.data.userId;
            x.id = res.message.data.id;

            //       alert("got massge")

            if (!this.usersWithToken[x.sendPersonId]) {
                this.nextUsePageNumber = 0
                this.clearAndGetAllChatPeople();
            }


            if (!this.selectedContact || (this.selectedContact.userId !== res.message.data.userId)) {

                if (!this.usersWithToken[x.sendPersonId]) {
                    this.getAllChatPeople();
                } else {

                    let count = this.usersWithToken[x.sendPersonId].unreadMessage;
                    this.usersWithToken[x.sendPersonId].unreadMessage = count + 1;

                }

                this.playAudio();

            } else if (this.selectedContact.userId === res.message.data.userId) {
                this.allChats.push(x);
                this._prepareChatForReplies();
            } else if (this.selectedContact.userId !== res.message.data.userId) {

 
            }
        })




        this.messageService.notificationAnnounced$.subscribe(res => {

            if (res.topic === "data") {

                this.loggedUserDetails = res.message;
                //console.log("logged user details" + this.loggedUserDetails.userProfilePicture.imageUrl);

            }



            //   alert(JSON.stringify(this.details.userProfilePicture))
        });


        this.sendMessageDetails = new Chat();
        // this.getPersonals();
        // this.reply()
        this.usersWithToken = new Map();
        this.usern = new User();
        this.loggedUserDetails = new Creator;

        this.principal.identity().then(account => {
            this.user = account;
            if (this.user) {
                this.getAllChatPeople();
            }



        });



        //  this.messageTestService.pushNotification("REQUEST_USER_PROFILE_DATA");





        // Subscribe to the foldedChanged observable
        this._fuseSidebarService.getSidebar('chatPanel').foldedChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((folded) => {
                this.sidebarFolded = folded;
            });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        //
        //  this.messageTestService.pushNotification("REQUEST_USER_PROFILE_DATA");
        this._chatViewScrollbar = this._fusePerfectScrollbarDirectives.find((directive) => {
            return directive.elementRef.nativeElement.id === 'messages';
        });
    }


    searchFriends(search: string, type) {
        if (type === 'chat') {
            this.chat = true;
        }
        if (search.length > 0)
            this.userService.searchByName(search).subscribe(
                res => {
                    this.searchResult = res.body;
                    //console.log('result' + JSON.stringify(res.body));
                },
                err => {
                    //console.log(JSON.stringify(err));
                }
                // this.userList = res.body;
            );
        // else
        //   this.refresh(); 

        //this.input.emit(event.target.value);
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadChatPersonsWithRules() {





    }




    playAudio() {
        let audio = new Audio();
        audio.src = "assets/sounds/definite.mp3";
        audio.load();
        audio.play();
    }



    private _prepareChatForReplies(): void {
        setTimeout(() => {

            // Focus to the reply input
            // this._replyInput.nativeElement.focus();

            // Scroll to the bottom of the messages list
            if (this._chatViewScrollbar) {
                this._chatViewScrollbar.update();

                setTimeout(() => {
                    this._chatViewScrollbar.scrollToBottom(0);
                });
            }
        });
    }


    // getPersonals() {
    //     this.chatService.getAllPeople().subscribe(
    //         res => {
    //             this.contacts = res.body;
    //             //console.log("people arrived" + JSON.stringify(this.contacts))
    //         }, err => {
    //             //console.log("Error in getting people")
    //         }
    //     )
    // }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fold the temporarily unfolded sidebar back
     */
    foldSidebarTemporarily(): void {
        this._fuseSidebarService.getSidebar('chatPanel').foldTemporarily();
    }

    /**
     * Unfold the sidebar temporarily
     */
    unfoldSidebarTemporarily(): void {
        this._fuseSidebarService.getSidebar('chatPanel').unfoldTemporarily();
    }

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpen(): void {
        this._fuseSidebarService.getSidebar('chatPanel').toggleOpen();
    }

    /**
     * Decide whether to show or not the contact's avatar in the message row
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    shouldShowContactAvatar(message, i): boolean {
        return (
            message.who === this.selectedContact.id &&
            ((this.chat.dialog[i + 1] && this.chat.dialog[i + 1].who !== this.selectedContact.id) || !this.chat.dialog[i + 1])
        );
    }

    /**
     * Check if the given message is the first message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    // isFirstMessageOfGroup(message, i): boolean {
    //     return (i === 0 || this.chat.dialog[i - 1] && this.chat.dialog[i - 1].who !== message.who);
    // }

    // isLastMessageOfGroup(message, i): boolean {
    //     return (i === this.chat.dialog.length - 1 || this.chat.dialog[i + 1] && this.chat.dialog[i + 1].who !== message.who);
    // }



    isFirstMessageOfGroup(message, i): boolean {
        return (i === 0 || this.allChats[i - 1] && this.allChats[i - 1].receivedPeronId !== message.receivedPeronId);
    }

    isLastMessageOfGroup(message, i): boolean {
        return (i === this.allChats.length - 1 || this.allChats[i + 1] && this.allChats[i + 1].receivedPeronId !== message.receivedPeronId);
    }



    /**
     * Toggle chat with the contact
     *
     * @param contact
     */








    // toggleChat(contact): void {

    //     if (this.selectedContact && contact.id === this.selectedContact.id) {
    //         // Reset
    //         this.resetChat();
    //     }
    //     else {
    //         // Unfold the sidebar temporarily
    //         this.unfoldSidebarTemporarily();

    //         // Set the selected contact
    //         this.selectedContact = contact;

    //         // Load the chat
    //         this._chatPanelService.getChat(contact.id).then((chat) => {

    //             // Set the chat
    //             this.chat = chat;

    //             // Prepare the chat for the replies
    //             this._prepareChatForReplies();
    //         });
    //     }
    // }

    closeSearchResults() {
        this.searchResult = null;

    }

    getFriend(friendDetail) {
        this.selectedContact = friendDetail
        this.chatService.getUserToken(friendDetail.userId).subscribe(res => {

            //  this.selectedContact = friendDetail;
            this.usersWithToken[friendDetail.userId] = res.body[friendDetail.userId];
            this.toggleChat(friendDetail);
            this.getUserDetailsForComments(friendDetail.userId);
            //  alert(JSON.stringify(res.body))


        }, err => {

        })




    }

    toggleChat(contact): void {

        //  this.messageTestService.pushNotification("REQUEST_USER_PROFILE_DATA");
        this.unfoldSidebarTemporarily();

        this.selectedContact = contact;
        // this.mapUnreadMessages.delete(this.selectedContact.userId)



        if (this.usersWithToken[this.selectedContact.userId].unreadMessage > 0) {

            this.chatService.seenAllChats(this.user.id, this.selectedContact.userId).subscribe(res => {
                //console.log("seen messages " + res.body);
                this.getAllChats(this.selectedContact.userId);



                this.usersWithToken[this.selectedContact.userId].unreadMessage = 0;
            }, err => {

                //console.log("error in seen messages" + JSON.stringify(err))
                this.getAllChats(this.selectedContact.userId);


                this.usersWithToken[this.selectedContact.userId].unreadMessage = 0;

            });

        } else {
            this.getAllChats(this.selectedContact.userId);


        }





        //alert( JSON.stringify (this.selectedContact))


    }


    loadMoreChats() {

        this.chatService.getAllChat(this.user.id, this.selectedContact.userId, this.nextPageNumber).subscribe(res => {

            if (res.body) {

                this.tempAllChats = res.body;

                this.allChats.forEach((item, index) => {
                    this.tempAllChats.push(item)
                })


                this.allChats = this.tempAllChats;

                this.nextPageNumber++
                // alert("here " + JSON.stringify(this.tempAllChats));

            }

            //     this._prepareChatForReplies();

            //console.log("all chats : " + JSON.stringify(this.allChats))
        },
            err => {

            }
        )


    }



    getAllChats(userId) {

        this.chatService.getAllChat(this.user.id, userId).subscribe(res => {

            this.allChats = res.body;

            //console.log("all chats : " + JSON.stringify(this.allChats))
        },
            err => {

            }
        )

    }









    /**
     * Remove the selected contact and unload the chat
     */
    resetChat(): void {
        // Set the selected contact as null
        this.selectedContact = null;

        // Set the chat as null
        this.chat = null;
    }

    // reply(event): void {
    //     event.preventDefault();

    //     if (!this._replyForm.form.value.message) {
    //         return;
    //     }

    //     // Message
    //     const message = {
    //         who: this.user.id,
    //         message: this._replyForm.form.value.message,
    //         time: new Date().toISOString()
    //     };

    //     // Add the message to the chat
    //     this.chat.dialog.push(message);

    //     // Reset the reply form
    //     this._replyForm.reset();

    //     // Update the server
    //     this._chatPanelService.updateChat(this.chat.id, this.chat.dialog).then(response => {

    //         // Prepare the chat for the replies
    //         this._prepareChatForReplies();
    //     });
    // }

    reply(event?): void {

        let message = this._replyForm.form.value.message;
        this.sendMessageDetails.sendPersonId = this.user.id;
        this.sendMessageDetails.receivedPeronId = this.selectedContact.userId;
        this.sendMessageDetails.message = message;
        this.sendMessageDetails.userFCMToken = this.usersWithToken[this.selectedContact.userId].token;
        this.sendMessageDetails.senderName = this.loggedUserDetails.userProfile.firstName + this.loggedUserDetails.userProfile.lastName;
        this.sendMessageDetails.senderImageUrl = this.loggedUserDetails.userProfilePicture.imageUrl;
        this.sendMessageDetails.chatDateTime = moment(new Date(), 'YYYY-MM-DDTHH:mm');
        //console.log("picture : " + JSON.stringify(this.sendMessageDetails.senderImageUrl))
        // //console.log("receive person message : " + JSON.stringify(this.selectedContact.id))
        // //console.log("send message : " + JSON.stringify(this.sendMessageDetails))
        // this.chatService.saveChats().subscribe(res=>{
        //     //console.log("chat result : "+JSON.stringify(res))
        // })


        this.chatService.saveChat(this.sendMessageDetails).subscribe(
            res => {
                this.allChats.push(res.body)
                // //console.log("send message : " + JSON.stringify(res))
                this._replyForm.reset();
                this._prepareChatForReplies();


                if (!this.mapCommentUsers[this.sendMessageDetails.receivedPeronId]) {
                    this.clearAndGetAllChatPeople();
                }


            }, err => {
                //console.log("err : " + JSON.stringify(err))
            })

    }

    clearAndGetAllChatPeople() {

        // this.usersWithToken = new Map<any,any>();
        // this.mapCommentUsers = new Map<any,any>();
        this.getAllChatPeople()


    }

    getAllChatPeople() {

        this.chatService.getAllPeople(this.user.id, this.nextUsePageNumber).subscribe((res) => {

            // this.usersWithToken = res.body;

            if (this.usersWithToken.size === 0) {
                this.usersWithToken = res.body;
            } else {
                // alert("add data")
                Object.keys(res.body).forEach(newkey => {
                    this.usersWithToken[newkey] = res.body[newkey];
                })

            }
            this.nextUsePageNumber++

            //console.log("All chat people " + JSON.stringify(this.usersWithToken))
            if (Object.keys(res.body).length > 0)
                this.getUserDetailsForComments(Object.keys(this.usersWithToken));
        },
            err => {
                //console.log("ERRORRRRRRRRR in GETTING CHAT PEOPLE");
            }
        )


    }


    getUserDetailsForComments(ids) {

        this.postPublicityService.getUsersOfComments(ids).subscribe(
            moreUserDetails => {
                //this.mapCommentUsers = moreUserDetails.body;

                if (this.mapCommentUsers.size === 0) {
                    this.mapCommentUsers = moreUserDetails.body;
                } else {

                    Object.keys(moreUserDetails.body).forEach(newkey => {
                        this.mapCommentUsers[newkey] = moreUserDetails.body[newkey];
                    })

                }
                //console.log("More user details" + JSON.stringify(moreUserDetails.body))
            },
            err => {
                //console.log('No Comments' + JSON.stringify(err));
            }
        )
    }













}
