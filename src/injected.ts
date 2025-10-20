import { generatePDF } from "./utils/pdf";
import { getVGCSheet } from "./utils/sheet-converter";

declare global {
	interface Window {
		room: any;
	}
}

const teamBuilderRoomId = "room-teambuilder";
const teamWrapperClass = "teamwrapper";
const pokePasteFormId = "pokepasteForm";
const vgcButtonId = "vgc-team-sheet-button";

// This script runs in the page's context and has access to page variables
(function (): void {
	console.log("VGC Team Sheet Extension injected script loaded");
	var pdfUrl: string | undefined;

	window.addEventListener("message", (event) => {
		if (event.source !== window) return;
		if (event.data.type === "VGC_SHEET_PDF") {
			pdfUrl = event.data.pdfFile;
		}
	});

	const isTeambuilder = (): boolean => {
		return document.getElementById(teamBuilderRoomId) !== null;
	};

	const isTeamSet = (): boolean => {
		const teamWrapper = document.querySelector(`.${teamWrapperClass}`);
		if (!teamWrapper || teamWrapper.children.length === 0) return false;
		if (teamWrapper.children.length > 1) return false;
		return teamWrapper.children[0].classList.contains("pad");
	};

	const createButtonElement = (): HTMLParagraphElement => {
		const buttonContainer = document.createElement("p");
		buttonContainer.id = vgcButtonId;
		const button = document.createElement("button");
		button.name = "vgcTeamSheet";
		button.type = "button";
		button.className = "button exportbutton";
		button.innerHTML = '<i class="fa fa-download"></i> Generate VGC Team Sheet';
		button.onclick = (): void => {
			const vgcData = getVGCSheet(window.room.curSetList, window.room.curTeam.dex.species);
			if (vgcData) {
				generatePDF(vgcData, pdfUrl);
			}
		};

		buttonContainer.appendChild(button);
		return buttonContainer;
	};

	const insertTeamSheetButton = (): void => {
		const teamChart = document.querySelector(".teamchart");
		if (teamChart && !document.getElementById(vgcButtonId)) {
			const buttonContainer = createButtonElement();

			const pokePasteForm = document.querySelector(`#${pokePasteFormId}`);
			if (pokePasteForm) {
				pokePasteForm.appendChild(buttonContainer);
			} else {
				teamChart.after(buttonContainer);
			}
		}
	};

	var teambuilderObserver: MutationObserver | null = null;

	// Observer for the entire document to detect when room-teambuilder appears
	teambuilderObserver = new MutationObserver(() => {
		if (isTeambuilder()) {
			if (isTeamSet()) {
				insertTeamSheetButton();
			}
		}
	});

	// Start observing the document
	teambuilderObserver.observe(document.body, {
		childList: true,
		subtree: true,
	});
})();
