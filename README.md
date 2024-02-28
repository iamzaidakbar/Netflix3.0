# Netflix

- Intregated APP using PARCEL ( Bundler )
- Added routing using [react-router-dom, createBrowserRouter, RouterProvider, Outlet]
- used lazy loading along with suspense
- added custom hook for conditional bg color of header
- used useMemo to prevent form re-rendering components
- used debouncing to handle mouseover api call to improve the performance.
- optimized videomodal to handle api abortion.
- implemented Browse page using lazy loading along with suspense.
- added custom hook for generating Genre's
- implemented helper functions to handle API calls
- implemented infinite small video card scoll like netflix using Carousal.
- implemented Localstore functionility for storing the video duration.
- Implemented My List based on local storage.
- Implemented debounce for search using lodash.
- implemented caching in search results.
- implemented authentication for login and sigup using firebasea and localStorage.
- Implemented Notifications using local storage and setInterval.
- added recently played videos list using localstorage.
- added shimmer ui and loader to improve user performance.
- implemented create-profile, update-profile, add-profile, manage-profile using redux toolkit, localStorage and firebase.

# Structure

- signup - (Email, Password, confirm-password)

  - Create Profile - (name, avatar, email)
  - Choose Avatar - image
  - Save User- (name, email, avatar) in database
  - Navigate to create-profile (if user authenticated)

    - Email : from db
    - Name : from input
    - Avatar : from input

  - Navigate to home with created profile (if user authenticated)

- login

  - Select Profile (if user authenticated)
  - Navigate Home (if user authenticated)

  profiles

  - userID1

    - userProfiles
      - profileID1
        - displayName: "Profile 1"
        - email: "profile1@example.com"
        - photoURL: "http://example.com/profile1.jpg"
      - profileID2
        - displayName: "Profile 2"
        - email: "profile2@example.com"
        - photoURL: "http://example.com/profile2.jpg"
    - movies
      - // Movie data for user with userID1
    - videosPlayed
      - // Video played data for user with userID1
    - notifications
      - // Notification data for user with userID1
    - mylist
      - // My List data for user with userID1

  - userID2
    - userProfiles
      - profileID3
        - displayName: "Profile 3"
        - email: "profile3@example.com"
        - photoURL: "http://example.com/profile3.jpg"
    - movies
      - // Movie data for user with userID2
    - videosPlayed
      - // Video played data for user with userID2
    - notifications
      - // Notification data for user with userID2
    - mylist
      - // My List data for user with userID2
