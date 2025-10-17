import { PDFDocument, PDFTextField } from "pdf-lib";
import { VGCSheet } from "../types/vgc-sheet.type";

const pdfLocation = "https://raw.githubusercontent.com/kasp470f/ShowdownVGCTeamSheetExtension/refs/heads/master/public/base.pdf";
export async function generatePDF(vgcData: VGCSheet) {
    const pdfBytes = await fetch(pdfLocation).then(res => res.arrayBuffer());
    await PDFDocument.load(pdfBytes).then(pdfDoc => {
        const form = pdfDoc.getForm();
        for (var i = 0; i < vgcData.length; i++) {
            let poke = vgcData[i];
            var first_post_fix = i == 0 ? "" : `_${i + 1}`;
            var second_post_fix = `_${i + 7}`;

            setTextField(form, `Pokémon${first_post_fix}`, poke.name);
            setTextField(form, `Pokémon${second_post_fix}`, poke.name);

            setTextField(form, `Tera Type${first_post_fix}`, poke.tera);
            setTextField(form, `Tera Type${second_post_fix}`, poke.tera);

            setTextField(form, `Ability${first_post_fix}`, poke.ability);
            setTextField(form, `Ability${second_post_fix}`, poke.ability);

            setTextField(form, `Held Item${first_post_fix}`, poke.item);
            setTextField(form, `Held Item${second_post_fix}`, poke.item);

            setTextField(form, `Level${first_post_fix}`, poke.level.toString());
            setTextField(form, `HP${first_post_fix}`, poke.stats.hp.toString());
            setTextField(form, `Atk${first_post_fix}`, poke.stats.atk.toString());
            setTextField(form, `Def${first_post_fix}`, poke.stats.def.toString());
            setTextField(form, `Sp Atk${first_post_fix}`, poke.stats.spa.toString());
            setTextField(form, `Sp Def${first_post_fix}`, poke.stats.spd.toString());
            setTextField(form, `Speed${first_post_fix}`, poke.stats.spe.toString());

            setTextField(form, `Move 1${first_post_fix}`, poke.moves[0]);
            setTextField(form, `Move 1${second_post_fix}`, poke.moves[0]);

            setTextField(form, `Move 2${first_post_fix}`, poke.moves[1]);
            setTextField(form, `Move 2${second_post_fix}`, poke.moves[1]);

            setTextField(form, `Move 3${first_post_fix}`, poke.moves[2]);
            setTextField(form, `Move 3${second_post_fix}`, poke.moves[2]);

            setTextField(form, `Move 4${first_post_fix}`, poke.moves[3]);
            setTextField(form, `Move 4${second_post_fix}`, poke.moves[3]);
        }

        pdfDoc.save().then(data => {
            download(data, "filled_ots_check_before_printing.pdf", "application/pdf");
        });
    });
}

function download(data: Uint8Array, filename: string, type: string) {
    const blob = new Blob([data as BlobPart], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}


function setTextField(form: any, fieldName: string, value: string) {
    const field = form.getField(fieldName);
    (field as PDFTextField).setText(value);
}