import { generatePDF } from "./scripts/pdf";
import { getVGCSheet } from "./scripts/sheet-converter";

// This script runs in the page's context and has access to page variables
(function (): void {
	console.log('VGC Team Sheet Extension injected script loaded');

	const isInTeambuilder = (): boolean => {
		return document.getElementById('room-teambuilder') !== null;
	}

	const isTeamSet = (): boolean => {
		const teamWrapper = document.querySelector('.teamwrapper');
		if (!teamWrapper || teamWrapper.children.length === 0) return false;
		if (teamWrapper.children.length > 1) return false;
		return teamWrapper.children[0].classList.contains('pad');
	}

	const insertTeamSheetButton = (): void => {
		// under the element with the class 'teamchart'
		const teamChart = document.querySelector('.teamchart');
		if (teamChart && !document.getElementById('vgc-team-sheet-button')) {
			const buttonContainer = document.createElement('p');
			buttonContainer.id = 'vgc-team-sheet-button';
			const button = document.createElement('button');
			button.name = 'vgcTeamSheet';
			button.type = 'button';
			button.className = 'button exportbutton';
			button.innerHTML = '<i class="fa  fa-download"></i> Generate VGC Team Sheet';
			button.onclick = (): void => {
				// @ts-ignore
				const vgcData = getVGCSheet(window.room.curSetList, window.room.curTeam.dex.species);
				if (vgcData) {
					generatePDF(vgcData);
				}
			}

			buttonContainer.appendChild(button);

			const pokePasteForm = document.querySelector('#pokepasteForm');
			if (pokePasteForm) {
				pokePasteForm.appendChild(buttonContainer);
			} 
			else {
				teamChart.after(buttonContainer);
			}
		}
	}

	var teambuilderObserver: MutationObserver | null = null;

	// Observer for the entire document to detect when room-teambuilder appears
	teambuilderObserver = new MutationObserver(() => {
		if (isInTeambuilder()) {
			if (isTeamSet()) {
				insertTeamSheetButton();
			}
		}
	});

	// Start observing the document
	teambuilderObserver.observe(document.body, {
		childList: true,
		subtree: true
	});
})();