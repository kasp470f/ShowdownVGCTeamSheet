import { PDFDocument, PDFForm, PDFTextField } from "pdf-lib";
import { VGCSheet } from "../types/vgc-sheet";

/**
 * Generates a filled PDF document for VGC (Video Game Championships) team data.
 * The function takes Pokémon team data and a PDF template, populates the form fields
 * with the Pokémon information, and triggers a download of the completed PDF.
 *
 * @param vgcData - An array of Pokémon data objects containing name, Tera type, ability,
 *                  held item, level, stats, and moves for each team member
 * @param pdf - URL or path to the PDF template that will be filled with the VGC data
 * @returns A promise that resolves when the PDF has been generated and download started
 * @throws Will log an error to console if the PDF template cannot be loaded
 */
export async function generatePDF(vgcData: VGCSheet, pdf: any): Promise<void> {
	const pdfBytes = await fetch(pdf).then((res) => res.arrayBuffer());
	if (!pdfBytes) {
		console.error(`Failed to load PDF template from ${pdf}`);
		return;
	}

	await PDFDocument.load(pdfBytes).then((pdfDoc) => {
		const form = pdfDoc.getForm();
		for (var i = 0; i < vgcData.length; i++) {
			let poke = vgcData[i];

			setMultipleTextFields(form, "Pokémon", i, poke.name);
			setMultipleTextFields(form, "Tera Type", i, poke.tera);
			setMultipleTextFields(form, "Ability", i, poke.ability);
			setMultipleTextFields(form, "Held Item", i, poke.item);

			setStatTextField(form, `Level`, i, poke.level);
			setStatTextField(form, `HP`, i, poke.stats.hp);
			setStatTextField(form, `Atk`, i, poke.stats.atk);
			setStatTextField(form, `Def`, i, poke.stats.def);
			setStatTextField(form, `Sp Atk`, i, poke.stats.spa);
			setStatTextField(form, `Sp Def`, i, poke.stats.spd);
			setStatTextField(form, `Speed`, i, poke.stats.spe);

			for (var j = 0; j < poke.moves.length; j++) {
				setMultipleTextFields(form, `Move ${j + 1}`, i, poke.moves[j]);
			}
		}

		pdfDoc.save().then((data) => {
			download(data, "filled_ots_check_before_printing.pdf", "application/pdf");
		});
	});
}

/**
 * Triggers a file download in the browser.
 *
 * @param data - The binary data to be downloaded as a Uint8Array
 * @param filename - The name to be given to the downloaded file
 * @param type - The MIME type of the file (e.g., 'application/pdf', 'text/plain')
 * @returns void
 */
function download(data: Uint8Array, filename: string, type: string): void {
	const blob = new Blob([data as BlobPart], { type: type });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}

/**
 * Generates a field name by combining the base field name with an index.
 * If the index is between 1 and 6 (inclusive), it's incremented by 1 to adjust the numbering.
 * If the index is 0, it returns just the field name without an index.
 *
 * @param fieldName - The base field name to use
 * @param i - The index to append to the field name
 * @returns The combined field name with index (if applicable), joined by an underscore
 */
function getFieldName(fieldName: string, i: number): string {
	if (i > 0 && i < 7) i += 1;

	return [fieldName, i].filter((i) => i !== 0).join("_");
}

/**
 * Sets the text value of a field in a PDF form.
 *
 * @param form - The PDF form containing the field to modify
 * @param fieldName - The name of the field to set
 * @param fieldValue - The text value to set on the field
 *
 * @remarks
 * If the specified field cannot be found in the form, a warning is logged
 * to the console and the function returns without making any changes.
 * The function assumes that the field is a PDFTextField and casts it accordingly.
 */
function setTextField(form: PDFForm, fieldName: string, fieldValue: string): void {
	const field = form.getField(fieldName);
	if (field == undefined) {
		console.warn(`Field ${fieldName} not found`);
		return;
	}

	(field as PDFTextField).setText(fieldValue);
}

/**
 * Sets a value for a stat text field in a PDF form.
 * Converts the indexed field name using getFieldName and ensures the value is a string.
 *
 * @param form - The PDF form to modify
 * @param fieldName - The base field name to set
 * @param i - The index used to generate the complete field name
 * @param value - The value to set in the field (will be converted to string if numeric)
 * @returns void
 */
function setStatTextField(form: PDFForm, fieldName: string, i: number, value: string | number): void {
	var indexedFieldName = getFieldName(fieldName, i);

	let fieldValue = typeof value === "number" ? value.toString() : value;
	setTextField(form, indexedFieldName, fieldValue);
}

/**
 * Sets the same text value in corresponding fields on both the Closed Team Sheet (CTS)
 * and Open Team Sheet (OTS) sections of a PDF form.
 *
 * @param form - The PDF form to modify
 * @param fieldName - The base field name without index
 * @param i - The index for the CTS field (OTS field will use i + 7)
 * @param value - The text value to set in both fields
 *
 * @remarks
 * This function handles the synchronization between matching fields in the CTS and OTS
 * sections of Pokémon VGC team sheets.
 */
function setMultipleTextFields(form: PDFForm, fieldName: string, i: number, value: string): void {
	var CTS_FieldName = getFieldName(fieldName, i); // CTS: Closed Team Sheet
	var OTS_FieldName = getFieldName(fieldName, i + 7); // OTS: Open Team Sheet

	setTextField(form, CTS_FieldName, value);
	setTextField(form, OTS_FieldName, value);
}
