/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2016 (original work) Open Assessment Technologies SA;
 *
 */
define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/states/Question',
    'taoQtiItem/qtiCreator/widgets/helpers/formElement',
    'taoQtiItem/qtiCreator/editor/simpleContentEditableElement',
    'tpl!lentillesPCI/interaction/creator/tpl/propertiesForm',
    'lodash',
    'jquery'
], function(stateFactory, Question, formElement, simpleEditor, formTpl, _) {
    'use strict';

    var lentillesInteractionStateQuestion = stateFactory.extend(Question, function() {

    }, function() {
       
    });

    lentillesInteractionStateQuestion.prototype.initForm = function() {

        $(".lentillesInteraction").parent().parent().find('.state-switcher').hide();

        var _widget = this.widget,
            $form = _widget.$form,
            interaction = _widget.element,
            response = interaction.getResponseDeclaration();

        

        //render the form using the form template
        $form.html(formTpl({
            serial: response.serial,
        }));

        //init form javascript
        formElement.initWidget($form);

    };

    return lentillesInteractionStateQuestion;
});