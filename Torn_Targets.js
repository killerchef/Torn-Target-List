// ==UserScript==
// @name         Targets
// @namespace    Fsociety
// @version      0.5
// @description  Personal Target list for Torn, profile button to add/remove from list, panel with navigation
// @author       UnAmigo [3749876]
// @match        https://www.torn.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const STORAGE_KEY = "torn_target_list";
    const INDEX_KEY = "torn_target_index";

    function loadList() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    }
    function saveList(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    function loadIndex() {
        return parseInt(localStorage.getItem(INDEX_KEY) || "0", 10);
    }
    function saveIndex(i) {
        localStorage.setItem(INDEX_KEY, i);
    }

    // -------- Painel --------
    function createPanel() {
        if (document.getElementById("targetPanel")) return;

        const panel = document.createElement("div");
        panel.id = "targetPanel";
        panel.style.position = "fixed";
        panel.style.top = "200px";
        panel.style.left = "5px";
        panel.style.background = "rgba(0,0,0,0.5)";
        panel.style.color = "#fff";
        panel.style.padding = "6px";
        panel.style.zIndex = "99999";
        panel.style.fontSize = "11px";
        panel.style.borderRadius = "6px";
        panel.style.width = "80px";
        panel.style.textAlign = "center";

        panel.innerHTML = `
          <div>Total: <span id="totalTargets">0</span></div>
          <div>Left: <span id="remainingTargets">0</span></div>
          <button id="startList" class="targetBtn">Start</button>
          <button id="nextTarget" class="targetBtn">Next</button>
          <button id="importExport" class="targetBtn">List</button>
        `;
        document.body.appendChild(panel);

        styleButtons();

        document.getElementById("startList").onclick = () => {
            let list = loadList();
            if (list.length === 0) return alert("List empty");
            saveIndex(0);
            window.open(`https://www.torn.com/profiles.php?XID=${list[0]}`, "_blank");
            updatePanel();
        };

        document.getElementById("nextTarget").onclick = () => {
            let list = loadList();
            let i = loadIndex();
            if (list.length === 0) return alert("List empty");
            if (i >= list.length - 1) return alert("End of list");
            i++;
            saveIndex(i);
            window.location.href = `https://www.torn.com/profiles.php?XID=${list[i]}`;
            updatePanel();
        };

        document.getElementById("importExport").onclick = () => {
            let list = loadList();
            let data = prompt("Edit IDs (comma separated):", list.join(","));
            if (data !== null) {
                let newList = data.split(",").map(x => x.trim()).filter(x => x);
                saveList(newList);
                saveIndex(0);
                updatePanel();
            }
        };

        updatePanel();
    }

    function styleButtons() {
        document.querySelectorAll(".targetBtn").forEach(btn => {
            btn.style.display = "block";
            btn.style.width = "100%";
            btn.style.margin = "4px 0";
            btn.style.padding = "4px";
            btn.style.background = "#193e59";
            btn.style.color = "#fff";
            btn.style.border = "none";
            btn.style.borderRadius = "4px";
            btn.style.cursor = "pointer";
            btn.style.fontSize = "11px";
            btn.style.fontWeight = "bold";
        });
    }

    function updatePanel() {
        let list = loadList();
        let i = loadIndex();
        let total = document.getElementById("totalTargets");
        let remaining = document.getElementById("remainingTargets");
        if (total && remaining) {
            total.textContent = list.length;
            remaining.textContent = Math.max(0, list.length - i);
        }
    }

    // -------- Botão no perfil (toggle) --------
    function addProfileButton() {
        if (!/profiles\.php\?XID=\d+/.test(window.location.href)) return;

        let idMatch = window.location.href.match(/XID=(\d+)/);
        if (!idMatch) return;
        let playerId = idMatch[1];

        if (document.getElementById("targetProfileBtn")) return;

        let nameEl = document.querySelector(".user-info-value, .title-black, h4");
        if (!nameEl) return;

        let btn = document.createElement("button");
        btn.id = "targetProfileBtn";
        btn.style.marginTop = "6px";
        btn.style.marginLeft = "8px";
        btn.style.padding = "4px 6px";
        btn.style.border = "none";
        btn.style.borderRadius = "4px";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "11px";
        btn.style.fontWeight = "bold";

        function refreshButton() {
            let list = loadList();
            if (list.includes(playerId)) {
                btn.textContent = "❌ Remove";
                btn.style.background = "#c0392b";
                btn.style.color = "#fff";
            } else {
                btn.textContent = "🎯 Add";
                btn.style.background = "#e67e22";
                btn.style.color = "#fff";
            }
        }

        btn.onclick = () => {
            let list = loadList();
            if (list.includes(playerId)) {
                list = list.filter(x => x !== playerId);
                saveList(list);

            } else {
                list.push(playerId);
                saveList(list);

            }
            updatePanel();
            refreshButton();
        };

        nameEl.appendChild(btn);
        refreshButton();
    }

    // -------- Init --------
    function init() {
        createPanel();
        addProfileButton();
    }

    document.addEventListener("DOMContentLoaded", init);
    // TornPDA hack: observa mudanças no DOM
    setInterval(() => {
        createPanel();
        addProfileButton();
    }, 2000);

})();
