import { PokemonSet } from "./types/pokemon-set";
import { Team } from "./types/team";
import { generatePDF } from "./utils/pdf";
import { getVGCSheet } from "./utils/sheet-converter";

declare global {
	interface Window {
		room: {
			curSetList: PokemonSet[];
			curTeam: Team | null;
		};
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

	const isCreateButtonDisabled = (): boolean => {
		const team = window.room?.curTeam;
		if (!team || team.capacity > 6) return true;
		return false;
	};

	const createButtonElement = (): HTMLParagraphElement | undefined => {
		const buttonContainer = document.createElement("p");
		buttonContainer.id = vgcButtonId;
		const button = document.createElement("button");
		button.name = "vgcTeamSheet";
		button.type = "button";
		button.className = "button exportbutton";
		button.innerHTML = '<i class="fa fa-download"></i> Generate VGC Team Sheet';

		const windowCurSetList = window.room?.curSetList;
		const windowCurTeam = window.room?.curTeam;
		const windowDex = windowCurTeam?.dex;

		if (!windowCurSetList || !windowDex) return;

		button.disabled = isCreateButtonDisabled();
		button.onclick = (): void => {
			const vgcData = getVGCSheet(windowCurSetList, windowDex);
			if (vgcData) {
				generatePDF(vgcData, pdfUrl, windowCurTeam?.name);
			}
		};

		buttonContainer.appendChild(button);
		return buttonContainer;
	};

	const insertTeamSheetButton = (): void => {
		const teamChart = document.querySelector(".teamchart");
		if (teamChart && !document.getElementById(vgcButtonId)) {
			const buttonContainer = createButtonElement();
			if (!buttonContainer) return;

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
