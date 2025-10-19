import { PDFDocument, PDFForm, PDFTextField } from "pdf-lib";
import { VGCSheet } from "../types/vgc-sheet";

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

function download(data: Uint8Array, filename: string, type: string): void {
	const blob = new Blob([data as BlobPart], { type: type });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}

function getFieldName(fieldName: string, i: number): string {
	if (i > 0 && i < 7) i += 1;

	return [fieldName, i].filter((i) => i !== 0).join("_");
}

function setTextField(form: PDFForm, fieldName: string, fieldValue: string): void {
	const field = form.getField(fieldName);
	if (field == undefined) {
		console.warn(`Field ${fieldName} not found`);
		return;
	}

	(field as PDFTextField).setText(fieldValue);
}

function setStatTextField(form: PDFForm, fieldName: string, i: number, value: string | number): void {
	var indexedFieldName = getFieldName(fieldName, i);

	let fieldValue = typeof value === "number" ? value.toString() : value;
	setTextField(form, indexedFieldName, fieldValue);
}

function setMultipleTextFields(form: PDFForm, fieldName: string, i: number, value: string): void {
	var CTS_FieldName = getFieldName(fieldName, i); // CTS: Closed Team Sheet
	var OTS_FieldName = getFieldName(fieldName, i + 7); // OTS: Open Team Sheet

	setTextField(form, CTS_FieldName, value);
	setTextField(form, OTS_FieldName, value);
}
