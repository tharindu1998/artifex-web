import { FuseNavigation } from '@fuse/types';
import { icon } from '@fortawesome/fontawesome-svg-core';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        type: 'group',
        children: [
            {
                id: 'createCreation',
                title: 'My Creations',
                type: 'collapsable',
                icon: 'book',
                // url: '/creations',
                children:[
                    {
                        id: 'writings',
                        title: 'My Writings',
                        type: 'item',
                        url: '/creations/writings',
                        icon: 'assignment'
                    },
                    {
                        id: 'comics',
                        title: 'My Comics',
                        type: 'item',
                        url: '/creations/comics',
                        icon: 'art_track'
                    },
                ]
                
            },
            {
                id: 'analytics',
                title: 'My Analytics',
                type: 'item',
                icon: 'assessment',
                url: '/analytics'
            },
            // {
            //     id: 'advertisement-summary',
            //     title: 'Advertisement summary',
            //     type: 'item',
            //     icon: 'assessment',
            //     url: '/advertisement-summary'
            // }

        ]
    },
    {
        id: 'boards',
        title: 'Boards',
        type: 'group',
        children: [
            {
                id: 'artden',
                title: 'ArtDen',
                type: 'item',
                icon: 'brush',
                url: '/boards/artden',
                
            },
            {
                id: 'profile',
                title: 'My Profile',
                type: 'item',
                icon: 'account_circle',
                url: '/boards/profile'
              
            },

            {
                id: 'settings',
                title: 'Settings',  
                type: 'collapsable',
                icon: 'settings',
                children: [
                    {
                        id: 'general',
                        title: 'General',
                        type: 'item',
                        url: '/settings/general'
                    },
                    {
                        id: 'account',
                        title: 'Account',
                        type: 'item',
                        url: '/settings/account'
                    },
                    {
                        id: 'security',
                        title: 'Security',
                        type: 'item',
                        url: '/settings/security'
                    },
                            
                ]
            }

        ]
    }
    

   
    
    
];
