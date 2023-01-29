import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertAccordionCommand from './insertaccordioncommand';

export default class AccordionEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertAccordion',
      new InsertAccordionCommand(this.editor),
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('accordion', {
      isObject: true,
      allowWhere: '$block',
    });

    schema.register('accordionHeading', {

    });

    schema.register('accordionButton', {
      isLimit: false,
      allowIn: 'accordion',
      allowContentOf: '$block',
    });

    schema.register('accordionLabel', {
      inheritAllFrom: '$inlineObject', // <-- ???
      isLimit: true,
      allowIn: 'accordionButton',
    });

    schema.register('accordionContent', {
      isLimit: true,
      allowIn: 'accordion',
      allowContentOf: '$root',
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'accordion',
      view: {
        name: 'div',
        classes: 'accordion',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'accordionButton',
      view: {
        name: 'span',
        classes: 'accordion__button',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'accordionLabel',
      view: {
        name: 'span',
        classes: 'accordion__label',
      }
    });

    conversion.for('upcast').elementToElement({
      model: 'accordionContent',
      view: {
        name: 'div',
        classes: 'accordion__expandable-content',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'accordion',
      view: {
        name: 'div',
        classes: 'accordion',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'accordionButton',
      view: {
        name: 'span',
        classes: 'accordion__button',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'accordionLabel',
      view: {
        name: 'span',
        classes: 'accordion__label',
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'accordionContent',
      view: {
        name: 'div',
        classes: 'accordion__expandable-content',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'accordion',
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement('div', {
          class: 'accordion',
        });

        return toWidget(section, viewWriter, { label: 'accordion widget' });
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'accordionButton',
      view: (modelElement, { writer: viewWriter }) => {
        const button = viewWriter.createEditableElement('span', {
          class: 'accordion__button',
        });
        return toWidget(button, viewWriter);
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'accordionLabel',
      view: (modelElement, { writer: viewWriter }) => {
        const label = viewWriter.createEditableElement('span', {
          class: 'accordion__label',
        });
        return toWidgetEditable(label, viewWriter);
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'accordionContent',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'accordion__expandable-content',
        });
        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
