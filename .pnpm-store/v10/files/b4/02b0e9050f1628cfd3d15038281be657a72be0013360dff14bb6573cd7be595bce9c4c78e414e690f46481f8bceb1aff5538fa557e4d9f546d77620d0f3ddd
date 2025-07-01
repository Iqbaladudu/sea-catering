'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { useCallback } from 'react';
import { Banner } from '../../elements/Banner/index.js';
import { Button } from '../../elements/Button/index.js';
import { DraggableSortableItem } from '../../elements/DraggableSortable/DraggableSortableItem/index.js';
import { DraggableSortable } from '../../elements/DraggableSortable/index.js';
import { ErrorPill } from '../../elements/ErrorPill/index.js';
import { RenderCustomComponent } from '../../elements/RenderCustomComponent/index.js';
import { FieldDescription } from '../../fields/FieldDescription/index.js';
import { FieldError } from '../../fields/FieldError/index.js';
import { FieldLabel } from '../../fields/FieldLabel/index.js';
import { useForm, useFormSubmitted } from '../../forms/Form/context.js';
import { extractRowsAndCollapsedIDs, toggleAllRows } from '../../forms/Form/rowHelpers.js';
import { NullifyLocaleField } from '../../forms/NullifyField/index.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { useLocale } from '../../providers/Locale/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { scrollToID } from '../../utilities/scrollToID.js';
import { fieldBaseClass } from '../shared/index.js';
import { ArrayRow } from './ArrayRow.js';
import './index.scss';
const baseClass = 'array-field';
export const ArrayFieldComponent = props => {
  const $ = _c(52);
  const {
    field: t0,
    forceRender: t1,
    path: pathFromProps,
    permissions,
    readOnly,
    schemaPath: schemaPathFromProps,
    validate
  } = props;
  const {
    name,
    admin: t2,
    fields,
    label,
    localized,
    maxRows,
    minRows: minRowsProp,
    required
  } = t0;
  let t3;
  if ($[0] !== t2) {
    t3 = t2 === undefined ? {} : t2;
    $[0] = t2;
    $[1] = t3;
  } else {
    t3 = $[1];
  }
  const {
    className,
    description,
    isSortable: t4
  } = t3;
  const isSortable = t4 === undefined ? true : t4;
  const forceRender = t1 === undefined ? false : t1;
  const schemaPath = schemaPathFromProps ?? name;
  const minRows = minRowsProp ?? required ? 1 : 0;
  const {
    setDocFieldPreferences
  } = useDocumentInfo();
  const {
    addFieldRow,
    dispatchFields,
    moveFieldRow,
    removeFieldRow,
    setModified
  } = useForm();
  const submitted = useFormSubmitted();
  const {
    code: locale
  } = useLocale();
  const {
    i18n,
    t
  } = useTranslation();
  const {
    config: t5
  } = useConfig();
  const {
    localization
  } = t5;
  let t6;
  bb0: {
    if (localization && localization.fallback) {
      const defaultLocale = localization.defaultLocale;
      t6 = locale === defaultLocale;
      break bb0;
    }
    t6 = true;
  }
  const editingDefaultLocale = t6;
  let t7;
  if ($[2] !== t) {
    t7 = p => {
      if ("labels" in p && p?.labels) {
        return p.labels;
      }
      if ("labels" in p.field && p.field.labels) {
        return {
          plural: p.field.labels?.plural,
          singular: p.field.labels?.singular
        };
      }
      if ("label" in p.field && p.field.label) {
        return {
          plural: undefined,
          singular: p.field.label
        };
      }
      return {
        plural: t("general:rows"),
        singular: t("general:row")
      };
    };
    $[2] = t;
    $[3] = t7;
  } else {
    t7 = $[3];
  }
  const getLabels = t7;
  const labels = getLabels(props);
  let t8;
  if ($[4] !== editingDefaultLocale || $[5] !== maxRows || $[6] !== minRows || $[7] !== required || $[8] !== validate) {
    t8 = (value, options) => {
      if (!editingDefaultLocale && value === null) {
        return true;
      }
      if (typeof validate === "function") {
        return validate(value, {
          ...options,
          maxRows,
          minRows,
          required
        });
      }
    };
    $[4] = editingDefaultLocale;
    $[5] = maxRows;
    $[6] = minRows;
    $[7] = required;
    $[8] = validate;
    $[9] = t8;
  } else {
    t8 = $[9];
  }
  const memoizedValidate = t8;
  let t9;
  if ($[10] !== memoizedValidate || $[11] !== pathFromProps) {
    t9 = {
      hasRows: true,
      potentiallyStalePath: pathFromProps,
      validate: memoizedValidate
    };
    $[10] = memoizedValidate;
    $[11] = pathFromProps;
    $[12] = t9;
  } else {
    t9 = $[12];
  }
  const {
    customComponents: t10,
    disabled,
    errorPaths,
    path,
    rows: t11,
    showError,
    valid,
    value: value_0
  } = useField(t9);
  let t12;
  if ($[13] !== t10) {
    t12 = t10 === undefined ? {} : t10;
    $[13] = t10;
    $[14] = t12;
  } else {
    t12 = $[14];
  }
  const {
    AfterInput,
    BeforeInput,
    Description,
    Error,
    Label
  } = t12;
  let t13;
  if ($[15] !== t11) {
    t13 = t11 === undefined ? [] : t11;
    $[15] = t11;
    $[16] = t13;
  } else {
    t13 = $[16];
  }
  const rows = t13;
  let t14;
  if ($[17] !== addFieldRow || $[18] !== path || $[19] !== schemaPath) {
    t14 = rowIndex => {
      addFieldRow({
        path,
        rowIndex,
        schemaPath
      });
      setTimeout(() => {
        scrollToID(`${path}-row-${rowIndex}`);
      }, 0);
    };
    $[17] = addFieldRow;
    $[18] = path;
    $[19] = schemaPath;
    $[20] = t14;
  } else {
    t14 = $[20];
  }
  const addRow = t14;
  let t15;
  if ($[21] !== dispatchFields || $[22] !== path || $[23] !== setModified) {
    t15 = rowIndex_0 => {
      dispatchFields({
        type: "DUPLICATE_ROW",
        path,
        rowIndex: rowIndex_0
      });
      setModified(true);
      setTimeout(() => {
        scrollToID(`${path}-row-${rowIndex_0}`);
      }, 0);
    };
    $[21] = dispatchFields;
    $[22] = path;
    $[23] = setModified;
    $[24] = t15;
  } else {
    t15 = $[24];
  }
  const duplicateRow = t15;
  let t16;
  if ($[25] !== path || $[26] !== removeFieldRow) {
    t16 = rowIndex_1 => {
      removeFieldRow({
        path,
        rowIndex: rowIndex_1
      });
    };
    $[25] = path;
    $[26] = removeFieldRow;
    $[27] = t16;
  } else {
    t16 = $[27];
  }
  const removeRow = t16;
  let t17;
  if ($[28] !== moveFieldRow || $[29] !== path) {
    t17 = (moveFromIndex, moveToIndex) => {
      moveFieldRow({
        moveFromIndex,
        moveToIndex,
        path
      });
    };
    $[28] = moveFieldRow;
    $[29] = path;
    $[30] = t17;
  } else {
    t17 = $[30];
  }
  const moveRow = t17;
  let t18;
  if ($[31] !== dispatchFields || $[32] !== path || $[33] !== rows || $[34] !== setDocFieldPreferences) {
    t18 = collapsed => {
      const {
        collapsedIDs,
        updatedRows
      } = toggleAllRows({
        collapsed,
        rows
      });
      setDocFieldPreferences(path, {
        collapsed: collapsedIDs
      });
      dispatchFields({
        type: "SET_ALL_ROWS_COLLAPSED",
        path,
        updatedRows
      });
    };
    $[31] = dispatchFields;
    $[32] = path;
    $[33] = rows;
    $[34] = setDocFieldPreferences;
    $[35] = t18;
  } else {
    t18 = $[35];
  }
  const toggleCollapseAll = t18;
  let t19;
  if ($[36] !== dispatchFields || $[37] !== path || $[38] !== rows || $[39] !== setDocFieldPreferences) {
    t19 = (rowID, collapsed_0) => {
      const {
        collapsedIDs: collapsedIDs_0,
        updatedRows: updatedRows_0
      } = extractRowsAndCollapsedIDs({
        collapsed: collapsed_0,
        rowID,
        rows
      });
      dispatchFields({
        type: "SET_ROW_COLLAPSED",
        path,
        updatedRows: updatedRows_0
      });
      setDocFieldPreferences(path, {
        collapsed: collapsedIDs_0
      });
    };
    $[36] = dispatchFields;
    $[37] = path;
    $[38] = rows;
    $[39] = setDocFieldPreferences;
    $[40] = t19;
  } else {
    t19 = $[40];
  }
  const setCollapse = t19;
  const hasMaxRows = maxRows && rows.length >= maxRows;
  const fieldErrorCount = errorPaths.length;
  const fieldHasErrors = submitted && errorPaths.length > 0;
  const showRequired = (readOnly || disabled) && rows.length === 0;
  const showMinRows = rows.length && rows.length < minRows || required && rows.length === 0;
  const t20 = fieldHasErrors ? `${baseClass}--has-error` : `${baseClass}--has-no-error`;
  let t21;
  if ($[41] !== className || $[42] !== t20) {
    t21 = [fieldBaseClass, baseClass, className, t20].filter(Boolean);
    $[41] = className;
    $[42] = t20;
    $[43] = t21;
  } else {
    t21 = $[43];
  }
  let t22;
  if ($[44] !== Error || $[45] !== path || $[46] !== showError) {
    t22 = showError && _jsx(RenderCustomComponent, {
      CustomComponent: Error,
      Fallback: _jsx(FieldError, {
        path,
        showError
      })
    });
    $[44] = Error;
    $[45] = path;
    $[46] = showError;
    $[47] = t22;
  } else {
    t22 = $[47];
  }
  let t23;
  if ($[48] !== fieldErrorCount || $[49] !== fieldHasErrors || $[50] !== i18n) {
    t23 = fieldHasErrors && fieldErrorCount > 0 && _jsx(ErrorPill, {
      count: fieldErrorCount,
      i18n,
      withMessage: true
    });
    $[48] = fieldErrorCount;
    $[49] = fieldHasErrors;
    $[50] = i18n;
    $[51] = t23;
  } else {
    t23 = $[51];
  }
  return _jsxs("div", {
    className: t21.join(" "),
    id: `field-${path.replace(/\./g, "__")}`,
    children: [t22, _jsxs("header", {
      className: `${baseClass}__header`,
      children: [_jsxs("div", {
        className: `${baseClass}__header-wrap`,
        children: [_jsxs("div", {
          className: `${baseClass}__header-content`,
          children: [_jsx("h3", {
            className: `${baseClass}__title`,
            children: _jsx(RenderCustomComponent, {
              CustomComponent: Label,
              Fallback: _jsx(FieldLabel, {
                as: "span",
                label,
                localized,
                path,
                required
              })
            })
          }), t23]
        }), rows?.length > 0 && _jsxs("ul", {
          className: `${baseClass}__header-actions`,
          children: [_jsx("li", {
            children: _jsx("button", {
              className: `${baseClass}__header-action`,
              onClick: () => toggleCollapseAll(true),
              type: "button",
              children: t("fields:collapseAll")
            })
          }), _jsx("li", {
            children: _jsx("button", {
              className: `${baseClass}__header-action`,
              onClick: () => toggleCollapseAll(false),
              type: "button",
              children: t("fields:showAll")
            })
          })]
        })]
      }), _jsx(RenderCustomComponent, {
        CustomComponent: Description,
        Fallback: _jsx(FieldDescription, {
          description,
          path
        })
      })]
    }), _jsx(NullifyLocaleField, {
      fieldValue: value_0,
      localized,
      path
    }), BeforeInput, (rows?.length > 0 || !valid && (showRequired || showMinRows)) && _jsxs(DraggableSortable, {
      className: `${baseClass}__draggable-rows`,
      ids: rows.map(_temp),
      onDragEnd: t24 => {
        const {
          moveFromIndex: moveFromIndex_0,
          moveToIndex: moveToIndex_0
        } = t24;
        return moveRow(moveFromIndex_0, moveToIndex_0);
      },
      children: [rows.map((rowData, i) => {
        const {
          id: rowID_0,
          isLoading
        } = rowData;
        const rowPath = `${path}.${i}`;
        const rowErrorCount = errorPaths?.filter(errorPath => errorPath.startsWith(rowPath + ".")).length;
        return _jsx(DraggableSortableItem, {
          disabled: readOnly || disabled || !isSortable,
          id: rowID_0,
          children: draggableSortableItemProps => _jsx(ArrayRow, {
            ...draggableSortableItemProps,
            addRow,
            CustomRowLabel: rows?.[i]?.customComponents?.RowLabel,
            duplicateRow,
            errorCount: rowErrorCount,
            fields,
            forceRender,
            hasMaxRows,
            isLoading,
            isSortable,
            labels,
            moveRow,
            parentPath: path,
            path: rowPath,
            permissions,
            readOnly: readOnly || disabled,
            removeRow,
            row: rowData,
            rowCount: rows?.length,
            rowIndex: i,
            schemaPath,
            setCollapse
          })
        }, rowID_0);
      }), !valid && _jsxs(React.Fragment, {
        children: [showRequired && _jsx(Banner, {
          children: t("validation:fieldHasNo", {
            label: getTranslation(labels.plural, i18n)
          })
        }), showMinRows && _jsx(Banner, {
          type: "error",
          children: t("validation:requiresAtLeast", {
            count: minRows,
            label: getTranslation(minRows > 1 ? labels.plural : labels.singular, i18n) || t(minRows > 1 ? "general:rows" : "general:row")
          })
        })]
      })]
    }), !hasMaxRows && !readOnly && _jsx(Button, {
      buttonStyle: "icon-label",
      className: `${baseClass}__add-row`,
      icon: "plus",
      iconPosition: "left",
      iconStyle: "with-border",
      onClick: () => {
        addRow(value_0 || 0);
      },
      children: t("fields:addLabel", {
        label: getTranslation(labels.singular, i18n)
      })
    }), AfterInput]
  });
};
export const ArrayField = withCondition(ArrayFieldComponent);
function _temp(row) {
  return row.id;
}
//# sourceMappingURL=index.js.map