/**
 * @file registers the accordion toolbar button and binds functionality to it.
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/accordion.svg';

export default class AccordionUI extends Plugin {
  init() {
    const editor = this.editor;

    // This will register the accordion toolbar button.
    editor.ui.componentFactory.add('accordion', (locale) => {
      const command = editor.commands.get('insertAccordion');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: editor.t('Accordion'),
        icon,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertAccordion'),
      );

      return buttonView;
    });
  }
}
