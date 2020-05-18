import * as firebase from 'firebase'
import 'firebase/storage'
import {firebaseConfig} from './firebaseConfig'

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref()

export const usersRef = databaseRef.child("users")
export const postsRef = databaseRef.child("posts")

export const storage = firebase.storage()
