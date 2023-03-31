"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Posts = {
    slug: 'posts',
    admin: {
        defaultColumns: ['title', 'imdbLink', 'author', 'category', 'tags', 'status'],
        useAsTitle: 'title',
    },
    access: {
        read: function () { return true; },
    },
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'imdbLink',
            type: 'text',
        },
        {
            name: 'imdbScore',
            type: 'number',
        },
        {
            name: 'thumbnail',
            type: 'upload',
            relationTo: 'media', // required
        },
        {
            name: 'yearRelease',
            type: 'number',
        },
        {
            name: 'countryRegion',
            type: 'text',
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
        },
        {
            name: 'publishedDate',
            type: 'date',
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories'
        },
        {
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags',
            hasMany: true,
        },
        {
            name: 'genres',
            type: 'relationship',
            relationTo: 'genres',
            hasMany: true,
        },
        {
            name: 'plotSynopsis',
            type: 'richText'
        },
        {
            name: 'externalReviews',
            type: 'richText'
        },
        {
            name: 'whyWatch',
            type: 'richText'
        },
        {
            name: 'starVerdict',
            type: 'number'
        },
        {
            name: 'status',
            type: 'select',
            options: [
                {
                    value: 'draft',
                    label: 'Draft',
                },
                {
                    value: 'published',
                    label: 'Published',
                },
            ],
            defaultValue: 'draft',
            admin: {
                position: 'sidebar',
            }
        }
    ],
};
exports.default = Posts;
