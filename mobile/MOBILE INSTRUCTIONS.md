# Mobile Instructions

Instructions on how to revert the recent StackExchange formattings (line height, colors, padding, etc.) on **mobile browsers**.

**- Table of Contents -**

- [iOS](#ios)
  * [Bookmarklets](#bookmarklets)
    + [Safari](#safari)
    + [Chrome (iOS)](#chrome-ios)
  * [Shortcuts](#shortcuts)
- [Android](#android)

# iOS

There's no way to *automatically* run scripts in iOS browsers (Safari, Chrome, etc.).<br>
The closest solution is to use [Javascript Bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet) or [Shortcuts](https://apps.apple.com/us/app/shortcuts/id915249334) that have to be one-click activated on each page!

## Bookmarklets

This will create a bookmark with Javascript code in it, that will be executed on current page when you open the bookmark.

### Safari

Instructions may vary depending on iOS version. This is written for iOS 13.

##### a) Copy script:

1. Go to [this gist](https://gist.github.com/Prid13/836b29347268515ad92e6bf858ab712b)
2. Choose which script you want:
   - `only old Line Height.js`: if you only want to revert the line-height to the old compact one
   - `revert more changes.js`: if you want additional changes like bg-colors, padding, border-radius
3. Press **Raw** button next to script
4. **Select** and **copy** the full script on your mobile phone

##### b) Create Bookmarklet:

1. Go to any website (doesn't matter)
2. **Create a Bookmark** in Safari:
   - press the Share icon
   - press **Add Bookmark**
3. Change the name to something appropriate *(e.g. StackOverflow change line-height)*
4. **Save** bookmark
5. **Edit** the bookmark:
   - press Book icon (bottom-right)
   - press Favorites folder (with star icon)
   - make sure you see your bookmark
   - press Edit (bottom-right)
   - press your bookmark
5. **Replace** the **bookmark link** with the contents of the **script** you copied
6. Save bookmark
7. Go to any StackExchange website (e.g. StackOverflow)
8. Open Bookmarks (book icon -> Favorites)
9. **Select your script bookmarklet** to activate it

> **NB:** you'll have to re-activate on each page load

-------

### Chrome (iOS)

Follow the [Safari guide](#safari) above. The only differences are these steps (for Chrome v85):

5. **Edit** the bookmark:
   - press **3 dots menu** (bottom-right)
   - press Bookmarks
   - (choose folder with bookmarks -- e.g. "Bookmarks for mobile")
   - make sure you see your bookmark
   - press Edit (bottom-right)
   - select your bookmark
   - press "More" at bottom
   - press **Edit bookmark**

-and-

8. Open Bookmarks (3 dots menu -> Bookmarks)

The rest should be identical!

## Shortcuts

> **Safari only, requires iOS 12+**

iOS 12 introduced a new first-party app, Shortcuts, that lets you automate a lot of tasks. Among them is the ability run Javascript code in Safari.<br>
The app comes pre-installed from iOS 13+.

1. Install the [Shortcuts app](https://apps.apple.com/us/app/shortcuts/id915249334) if you don't already have it
2. Open Shortcuts app
3. Press **Create Shortcut**
4. Press **Add Action**
5. Search for *"Javascript"*
6. Select **Run Javascript on Web Page**
7. Copy script ([full instructions](#a-copy-script)):
   - Open browser and go to [this gist](https://gist.github.com/Prid13/836b29347268515ad92e6bf858ab712b)
   - Copy which script you want:
      - `only old Line Height.js`: if you only want to revert the line-height to the old compact one
      - `revert more changes.js`: if you want additional changes like bg-colors, padding, border-radius
8. **Replace** the *default script* with the contents of the **script** you copied
9. **Add this at the end of the script:** ` completion();`
10. Press Next
11. Give it an appropriate name *(e.g. StackOverflow change line-height)*
12. Save script

Usage:

1. Open Safari browser
2. Go to any StackExchange website (e.g. StackOverflow)
3. Press Share icon
4. Scroll down till you see your shortcut script
5. **Select your shortcut** to activate it

> **NB:** you'll have to re-activate on each page load

**Pro Tip:** after pressing Share icon, scroll to bottom of list and press **Edit Actions...** Find your shortcut and press **green plus sign** to add it to favorites.
 Now the shortcut will appear at the top of the list ;)

# Android

- **[Kiwi Browser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser)** -- it's a Chromium-based browser for Android that lets you install and run almost any Chrome extension you can already find on desktop. 
Watch the [tutorial](https://www.youtube.com/watch?v=T6J0T_-oim4) on how to download extensions, and use my [extension](https://chrome.google.com/webstore/detail/revert-stackexchange-form/fliedkodjpgomjmjbkaehhlllnhmcjnh). *(not tested)*

- <s>**Firefox Browser for Android** offers addons.</s> Firefox on Android recently got [a major update](https://www.reddit.com/r/firefox/comments/ih9vmb/firefox_for_android_fenix_79_release_fennec_is/)
 that breaks most addons, which means Tampermonkey can't be used as of right now.
Get the [older version](https://releases.mozilla.org/pub/mobile/releases/68.11.0/) or try another browser.
  
- [Tampermonkey app](https://play.google.com/store/apps/details?id=net.biniok.tampermonkey) -- has anyone tested if this works? *(hasn't been updated since 2013)*

- Bookmarklets -- follow the instructions under [iOS -> Bookmarklets](#bookmarklets) to create a bookmark that executes Javascript on click (steps may vary)
