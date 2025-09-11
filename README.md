# Torn-Target-List

A lightweight userscript for [Torn.com](https://www.torn.com) that helps you manage a **personal target list** for attacks.  
This script adds a simple control panel and profile button for easy management, designed to work both in browser and **TornPDA**.

---

## ✨ Features
- **Profile Toggle Button**  
  - On any player profile, a single button lets you **add** or **remove** that player from your target list.  
  - Button automatically switches between 🎯 *Add* and ❌ *Remove*.  

- **Floating Panel (left side of the screen)**  
  - Displays total targets and how many are left.  
  - **Start** → Opens the first target in a new tab.  
  - **Next** → Loads the next target in the same tab.  
  - **List** → Import/export your target list (comma-separated IDs).  

- **Persistent Storage**  
  - Targets are stored in `localStorage`, so your list is saved between sessions.  

- **TornPDA Compatible**  
  - Includes DOM observers to work in TornPDA where pages often reload via AJAX.  

---

## 🚀 Installation
1. Install a userscript manager such as [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Edge, Opera) or [Greasemonkey](https://www.greasespot.net/) (Firefox).  
2. Create a new script and paste the code from this repository.  
3. Save and enable the script.  
4. Reload Torn.com (or TornPDA) to see the new panel and profile buttons.

---

## 🕹️ Usage
1. Go to any player’s profile → click the **Add** button (🎯).  
   - If already in your list, the button will show ❌ **Remove**.  
2. Open the side panel (always visible on the left):  
   - **Start** → begins the attack sequence from the first saved target.  
   - **Next** → navigates to the next target.  
   - **List** → manage your targets (bulk add/remove via comma-separated IDs).  


---

## 📌 Notes

This script is manual-use only: it will not auto-attack or auto-use items.

Targets are controlled by you (no automation to respect Torn’s ToS).

Tested on both desktop browsers and TornPDA.

---

## 🧑 Author

[UnAmigo [3749876]](https://www.torn.com/profiles.php?XID=3749876)
Made for personal use and shared with the Torn community.
