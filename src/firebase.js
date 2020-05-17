import * as firebase from 'firebase'
import {firebaseConfig} from './firebaseConfig'

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref()

export const usersRef = databaseRef.child("users")
export const postsRef = databaseRef.child("posts")

