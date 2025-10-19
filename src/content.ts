// Content script that injects our script into the page context
(function (): void {
	// Create and inject the script element
	const script = document.createElement("script");
	script.src = chrome.runtime.getURL("dist/injected.js");
	script.onload = function () {
		// Remove the script tag after execution
		script.remove();

		// Get the PDF file from the extension
		getPDF();
	};

	// Inject into the page
	(document.head || document.documentElement).appendChild(script);

	// Function to request the PDF file from the extension
	function getPDF() {
		//@ts-ignore
		const runtime = typeof browser !== "undefined" ? browser.runtime : chrome.runtime;
		const pdfFile = runtime.getURL("dist/base.pdf");

		window.postMessage({ type: "VGC_SHEET_PDF", pdfFile: pdfFile }, "*");
	}
})();
