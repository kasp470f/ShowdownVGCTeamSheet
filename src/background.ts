const REPORT_BUG_MENU_ID = "report-bug";
const REPORT_BUG_URL =
	"https://github.com/kasp470f/ShowdownVGCTeamSheet/issues";

function createReportBugMenu(): void {
	chrome.contextMenus.removeAll(() => {
		chrome.contextMenus.create({
			id: REPORT_BUG_MENU_ID,
			title: "Report bug",
			contexts: ["action"],
		});
	});
}

chrome.runtime.onInstalled.addListener(() => {
	createReportBugMenu();
});

chrome.runtime.onStartup.addListener(() => {
	createReportBugMenu();
});

chrome.contextMenus.onClicked.addListener((info) => {
	if (info.menuItemId !== REPORT_BUG_MENU_ID) {
		return;
	}

	chrome.tabs.create({ url: REPORT_BUG_URL });
});
