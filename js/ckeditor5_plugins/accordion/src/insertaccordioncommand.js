/**
 * @file defines InsertAccordionCommand, which is executed when the accordion
 * toolbar button is pressed.
 */

import { Command } from 'ckeditor5/src/core';

export default class InsertAccordionCommand extends Command {
  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      // Insert <accordion>*</accordion> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(createAccordion(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // accordion is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'accordion',
    );

    // If the cursor is not in a location where a accordion can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function createAccordion(writer) {
  const accordion = writer.createElement('accordion');
  const accordionButton = writer.createElement('accordionButton');
  const accordionContent = writer.createElement('accordionContent');

  writer.append(accordionButton, accordion);
  writer.append(accordionContent, accordion);
  writer.insertText('Accordion label', accordionButton);
  writer.insertText('Accordion content', accordionContent);

  return accordion;
}
