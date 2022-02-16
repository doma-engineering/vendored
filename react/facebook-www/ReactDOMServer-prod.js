/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @nolint
 * @preventMunge
 * @preserve-invariant-messages
 */

"use strict";
var React = require("react");
function formatProdErrorMessage(code) {
  for (
    var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code,
      i = 1;
    i < arguments.length;
    i++
  )
    url += "&args[]=" + encodeURIComponent(arguments[i]);
  return (
    "Minified React error #" +
    code +
    "; visit " +
    url +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var prevWasCommentSegmenter = !1;
function writeChunk(destination, chunk) {
  prevWasCommentSegmenter &&
    ((prevWasCommentSegmenter = !1),
    "<" !== chunk[0] && destination.push("\x3c!-- --\x3e"));
  return "\x3c!-- --\x3e" === chunk
    ? (prevWasCommentSegmenter = !0)
    : destination.push(chunk);
}
var enableFilterEmptyStringAttributesDOM = require("ReactFeatureFlags")
    .enableFilterEmptyStringAttributesDOM,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  VALID_ATTRIBUTE_NAME_REGEX = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  illegalAttributeNameCache = {},
  validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
    return !0;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return !1;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
    return (validatedAttributeNameCache[attributeName] = !0);
  illegalAttributeNameCache[attributeName] = !0;
  return !1;
}
function PropertyInfoRecord(
  name,
  type,
  mustUseProperty,
  attributeName,
  attributeNamespace,
  sanitizeURL,
  removeEmptyString
) {
  this.acceptsBooleans = 2 === type || 3 === type || 4 === type;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
  this.removeEmptyString = removeEmptyString;
}
var properties = {},
  reservedProps = "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(
    " "
  );
reservedProps.push("innerText", "textContent");
reservedProps.forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 0, !1, name, null, !1, !1);
});
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"]
].forEach(function(_ref) {
  var name = _ref[0];
  properties[name] = new PropertyInfoRecord(name, 1, !1, _ref[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    2,
    !1,
    name.toLowerCase(),
    null,
    !1,
    !1
  );
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha"
].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 2, !1, name, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function(name) {
    properties[name] = new PropertyInfoRecord(
      name,
      3,
      !1,
      name.toLowerCase(),
      null,
      !1,
      !1
    );
  });
["checked", "multiple", "muted", "selected"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 3, !0, name, null, !1, !1);
});
["capture", "download"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 4, !1, name, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 6, !1, name, null, !1, !1);
});
["rowSpan", "start"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    5,
    !1,
    name.toLowerCase(),
    null,
    !1,
    !1
  );
});
var CAMELIZE = /[\-:]([a-z])/g;
function capitalize(token) {
  return token[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function(attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      1,
      !1,
      attributeName,
      null,
      !1,
      !1
    );
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function(attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      1,
      !1,
      attributeName,
      "http://www.w3.org/1999/xlink",
      !1,
      !1
    );
  });
["xml:base", "xml:lang", "xml:space"].forEach(function(attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(
    name,
    1,
    !1,
    attributeName,
    "http://www.w3.org/XML/1998/namespace",
    !1,
    !1
  );
});
["tabIndex", "crossOrigin"].forEach(function(attributeName) {
  properties[attributeName] = new PropertyInfoRecord(
    attributeName,
    1,
    !1,
    attributeName.toLowerCase(),
    null,
    !1,
    !1
  );
});
properties.xlinkHref = new PropertyInfoRecord(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function(attributeName) {
  properties[attributeName] = new PropertyInfoRecord(
    attributeName,
    1,
    !1,
    attributeName.toLowerCase(),
    null,
    !0,
    !0
  );
});
var isUnitlessNumber = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  },
  prefixes = ["Webkit", "ms", "Moz", "O"];
Object.keys(isUnitlessNumber).forEach(function(prop) {
  prefixes.forEach(function(prefix) {
    prefix = prefix + prop.charAt(0).toUpperCase() + prop.substring(1);
    isUnitlessNumber[prefix] = isUnitlessNumber[prop];
  });
});
var matchHtmlRegExp = /["'&<>]/;
function escapeTextForBrowser(text) {
  if ("boolean" === typeof text || "number" === typeof text) return "" + text;
  text = "" + text;
  var match = matchHtmlRegExp.exec(text);
  if (match) {
    var html = "",
      index,
      lastIndex = 0;
    for (index = match.index; index < text.length; index++) {
      switch (text.charCodeAt(index)) {
        case 34:
          match = "&quot;";
          break;
        case 38:
          match = "&amp;";
          break;
        case 39:
          match = "&#x27;";
          break;
        case 60:
          match = "&lt;";
          break;
        case 62:
          match = "&gt;";
          break;
        default:
          continue;
      }
      lastIndex !== index && (html += text.substring(lastIndex, index));
      lastIndex = index + 1;
      html += match;
    }
    text = lastIndex !== index ? html + text.substring(lastIndex, index) : html;
  }
  return text;
}
var uppercasePattern = /([A-Z])/g,
  msPattern = /^ms-/,
  isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i,
  isArrayImpl = Array.isArray;
function createFormatContext(insertionMode, selectedValue) {
  return { insertionMode: insertionMode, selectedValue: selectedValue };
}
function getChildFormatContext(parentContext, type, props) {
  switch (type) {
    case "select":
      return createFormatContext(
        1,
        null != props.value ? props.value : props.defaultValue
      );
    case "svg":
      return createFormatContext(2, null);
    case "math":
      return createFormatContext(3, null);
    case "foreignObject":
      return createFormatContext(1, null);
    case "table":
      return createFormatContext(4, null);
    case "thead":
    case "tbody":
    case "tfoot":
      return createFormatContext(5, null);
    case "colgroup":
      return createFormatContext(7, null);
    case "tr":
      return createFormatContext(6, null);
  }
  return 4 <= parentContext.insertionMode || 0 === parentContext.insertionMode
    ? createFormatContext(1, null)
    : parentContext;
}
function pushTextInstance(target, text) {
  "" !== text && target.push(escapeTextForBrowser(text), "\x3c!-- --\x3e");
}
var styleNameCache = new Map();
function pushStyle(target, responseState, style) {
  if ("object" !== typeof style) throw Error(formatProdErrorMessage(62));
  responseState = !0;
  for (var styleName in style)
    if (hasOwnProperty.call(style, styleName)) {
      var styleValue = style[styleName];
      if (
        null != styleValue &&
        "boolean" !== typeof styleValue &&
        "" !== styleValue
      ) {
        if (0 === styleName.indexOf("--")) {
          var nameChunk = escapeTextForBrowser(styleName);
          styleValue = escapeTextForBrowser(("" + styleValue).trim());
        } else {
          nameChunk = styleName;
          var chunk = styleNameCache.get(nameChunk);
          void 0 !== chunk
            ? (nameChunk = chunk)
            : ((chunk = escapeTextForBrowser(
                nameChunk
                  .replace(uppercasePattern, "-$1")
                  .toLowerCase()
                  .replace(msPattern, "-ms-")
              )),
              styleNameCache.set(nameChunk, chunk),
              (nameChunk = chunk));
          styleValue =
            "number" === typeof styleValue
              ? 0 === styleValue ||
                hasOwnProperty.call(isUnitlessNumber, styleName)
                ? "" + styleValue
                : styleValue + "px"
              : escapeTextForBrowser(("" + styleValue).trim());
        }
        responseState
          ? ((responseState = !1),
            target.push(' style="', nameChunk, ":", styleValue))
          : target.push(";", nameChunk, ":", styleValue);
      }
    }
  responseState || target.push('"');
}
function pushAttribute(target, responseState, name, value) {
  switch (name) {
    case "style":
      pushStyle(target, responseState, value);
      return;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
      return;
  }
  if (
    !(2 < name.length) ||
    ("o" !== name[0] && "O" !== name[0]) ||
    ("n" !== name[1] && "N" !== name[1])
  )
    if (
      ((responseState = properties.hasOwnProperty(name)
        ? properties[name]
        : null),
      null !== responseState)
    ) {
      switch (typeof value) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (!responseState.acceptsBooleans) return;
      }
      if (
        !enableFilterEmptyStringAttributesDOM ||
        !responseState.removeEmptyString ||
        "" !== value
      )
        switch (((name = responseState.attributeName), responseState.type)) {
          case 3:
            value && target.push(" ", name, '=""');
            break;
          case 4:
            !0 === value
              ? target.push(" ", name, '=""')
              : !1 !== value &&
                target.push(" ", name, '="', escapeTextForBrowser(value), '"');
            break;
          case 5:
            isNaN(value) ||
              target.push(" ", name, '="', escapeTextForBrowser(value), '"');
            break;
          case 6:
            !isNaN(value) &&
              1 <= value &&
              target.push(" ", name, '="', escapeTextForBrowser(value), '"');
            break;
          default:
            if (
              responseState.sanitizeURL &&
              ((value = "" + value), isJavaScriptProtocol.test(value))
            )
              throw Error(formatProdErrorMessage(323));
            target.push(" ", name, '="', escapeTextForBrowser(value), '"');
        }
    } else if (isAttributeNameSafe(name)) {
      switch (typeof value) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (
            ((responseState = name.toLowerCase().slice(0, 5)),
            "data-" !== responseState && "aria-" !== responseState)
          )
            return;
      }
      target.push(" ", name, '="', escapeTextForBrowser(value), '"');
    }
}
function pushInnerHTML(target, innerHTML, children) {
  if (null != innerHTML) {
    if (null != children) throw Error(formatProdErrorMessage(60));
    if ("object" !== typeof innerHTML || !("__html" in innerHTML))
      throw Error(formatProdErrorMessage(61));
    innerHTML = innerHTML.__html;
    null !== innerHTML && void 0 !== innerHTML && target.push("" + innerHTML);
  }
}
function flattenOptionChildren(children) {
  var content = "";
  React.Children.forEach(children, function(child) {
    null != child && (content += child);
  });
  return content;
}
function pushStartGenericElement(target, props, tag, responseState) {
  target.push(startChunkForTag(tag));
  var innerHTML = (tag = null),
    propKey;
  for (propKey in props)
    if (hasOwnProperty.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
            tag = propValue;
            break;
          case "dangerouslySetInnerHTML":
            innerHTML = propValue;
            break;
          default:
            pushAttribute(target, responseState, propKey, propValue);
        }
    }
  target.push(">");
  pushInnerHTML(target, innerHTML, tag);
  return "string" === typeof tag
    ? (target.push(escapeTextForBrowser(tag)), null)
    : tag;
}
var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
  validatedTagCache = new Map();
function startChunkForTag(tag) {
  var tagStartChunk = validatedTagCache.get(tag);
  if (void 0 === tagStartChunk) {
    if (!VALID_TAG_REGEX.test(tag))
      throw Error(formatProdErrorMessage(65, tag));
    tagStartChunk = "<" + tag;
    validatedTagCache.set(tag, tagStartChunk);
  }
  return tagStartChunk;
}
function pushStartInstance(target, type, props, responseState, formatContext) {
  switch (type) {
    case "select":
      target.push(startChunkForTag("select"));
      var children = null,
        innerHTML = null;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
            }
        }
      target.push(">");
      pushInnerHTML(target, innerHTML, children);
      return children;
    case "option":
      innerHTML = formatContext.selectedValue;
      target.push(startChunkForTag("option"));
      var value = (propValue = null),
        selected = null;
      var propKey = null;
      for (children in props)
        if (
          hasOwnProperty.call(props, children) &&
          ((type = props[children]), null != type)
        )
          switch (children) {
            case "children":
              propValue = type;
              break;
            case "selected":
              selected = type;
              break;
            case "dangerouslySetInnerHTML":
              propKey = type;
              break;
            case "value":
              value = type;
            default:
              pushAttribute(target, responseState, children, type);
          }
      if (null !== innerHTML)
        if (
          ((props =
            null !== value ? "" + value : flattenOptionChildren(propValue)),
          isArrayImpl(innerHTML))
        )
          for (
            responseState = 0;
            responseState < innerHTML.length;
            responseState++
          ) {
            if ("" + innerHTML[responseState] === props) {
              target.push(' selected=""');
              break;
            }
          }
        else innerHTML === props && target.push(' selected=""');
      else selected && target.push(' selected=""');
      target.push(">");
      pushInnerHTML(target, propKey, propValue);
      return propValue;
    case "textarea":
      target.push(startChunkForTag("textarea"));
      propKey = innerHTML = children = null;
      for (propValue in props)
        if (
          hasOwnProperty.call(props, propValue) &&
          ((value = props[propValue]), null != value)
        )
          switch (propValue) {
            case "children":
              propKey = value;
              break;
            case "value":
              children = value;
              break;
            case "defaultValue":
              innerHTML = value;
              break;
            case "dangerouslySetInnerHTML":
              throw Error(formatProdErrorMessage(91));
            default:
              pushAttribute(target, responseState, propValue, value);
          }
      null === children && null !== innerHTML && (children = innerHTML);
      target.push(">");
      if (null != propKey) {
        if (null != children) throw Error(formatProdErrorMessage(92));
        if (isArrayImpl(propKey) && 1 < propKey.length)
          throw Error(formatProdErrorMessage(93));
        children = "" + propKey;
      }
      "string" === typeof children && "\n" === children[0] && target.push("\n");
      return children;
    case "input":
      target.push(startChunkForTag("input"));
      value = propKey = propValue = children = null;
      for (innerHTML in props)
        if (
          hasOwnProperty.call(props, innerHTML) &&
          ((selected = props[innerHTML]), null != selected)
        )
          switch (innerHTML) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(formatProdErrorMessage(399, "input"));
            case "defaultChecked":
              value = selected;
              break;
            case "defaultValue":
              propValue = selected;
              break;
            case "checked":
              propKey = selected;
              break;
            case "value":
              children = selected;
              break;
            default:
              pushAttribute(target, responseState, innerHTML, selected);
          }
      null !== propKey
        ? pushAttribute(target, responseState, "checked", propKey)
        : null !== value &&
          pushAttribute(target, responseState, "checked", value);
      null !== children
        ? pushAttribute(target, responseState, "value", children)
        : null !== propValue &&
          pushAttribute(target, responseState, "value", propValue);
      target.push("/>");
      return null;
    case "menuitem":
      target.push(startChunkForTag("menuitem"));
      for (var propKey$jscomp$0 in props)
        if (
          hasOwnProperty.call(props, propKey$jscomp$0) &&
          ((children = props[propKey$jscomp$0]), null != children)
        )
          switch (propKey$jscomp$0) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(formatProdErrorMessage(400));
            default:
              pushAttribute(target, responseState, propKey$jscomp$0, children);
          }
      target.push(">");
      return null;
    case "listing":
    case "pre":
      target.push(startChunkForTag(type));
      innerHTML = children = null;
      for (value in props)
        if (
          hasOwnProperty.call(props, value) &&
          ((propValue = props[value]), null != propValue)
        )
          switch (value) {
            case "children":
              children = propValue;
              break;
            case "dangerouslySetInnerHTML":
              innerHTML = propValue;
              break;
            default:
              pushAttribute(target, responseState, value, propValue);
          }
      target.push(">");
      if (null != innerHTML) {
        if (null != children) throw Error(formatProdErrorMessage(60));
        if ("object" !== typeof innerHTML || !("__html" in innerHTML))
          throw Error(formatProdErrorMessage(61));
        props = innerHTML.__html;
        null !== props &&
          void 0 !== props &&
          ("string" === typeof props && 0 < props.length && "\n" === props[0]
            ? target.push("\n", props)
            : target.push("" + props));
      }
      "string" === typeof children && "\n" === children[0] && target.push("\n");
      return children;
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "img":
    case "keygen":
    case "link":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
      target.push(startChunkForTag(type));
      for (var propKey$jscomp$1 in props)
        if (
          hasOwnProperty.call(props, propKey$jscomp$1) &&
          ((children = props[propKey$jscomp$1]), null != children)
        )
          switch (propKey$jscomp$1) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(formatProdErrorMessage(399, type));
            default:
              pushAttribute(target, responseState, propKey$jscomp$1, children);
          }
      target.push("/>");
      return null;
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return pushStartGenericElement(target, props, type, responseState);
    case "html":
      return (
        0 === formatContext.insertionMode && target.push("<!DOCTYPE html>"),
        pushStartGenericElement(target, props, type, responseState)
      );
    default:
      if (-1 === type.indexOf("-") && "string" !== typeof props.is)
        return pushStartGenericElement(target, props, type, responseState);
      target.push(startChunkForTag(type));
      innerHTML = children = null;
      for (selected in props)
        if (
          hasOwnProperty.call(props, selected) &&
          ((propValue = props[selected]),
          null != propValue &&
            "function" !== typeof propValue &&
            "object" !== typeof propValue)
        )
          switch (
            ("className" === selected && (selected = "class"), selected)
          ) {
            case "children":
              children = propValue;
              break;
            case "dangerouslySetInnerHTML":
              innerHTML = propValue;
              break;
            case "style":
              pushStyle(target, responseState, propValue);
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
              break;
            default:
              isAttributeNameSafe(selected) &&
                "function" !== typeof propValue &&
                "symbol" !== typeof propValue &&
                target.push(
                  " ",
                  selected,
                  '="',
                  escapeTextForBrowser(propValue),
                  '"'
                );
          }
      target.push(">");
      pushInnerHTML(target, innerHTML, children);
      return children;
  }
}
function writeStartPendingSuspenseBoundary(destination, responseState, id) {
  writeChunk(destination, '\x3c!--$?--\x3e<template id="');
  if (null === id) throw Error(formatProdErrorMessage(395));
  writeChunk(destination, id);
  return writeChunk(destination, '"></template>');
}
function writeStartSegment(destination, responseState, formatContext, id) {
  switch (formatContext.insertionMode) {
    case 0:
    case 1:
      return (
        writeChunk(destination, '<div hidden id="'),
        writeChunk(destination, responseState.segmentPrefix),
        writeChunk(destination, id.toString(16)),
        writeChunk(destination, '">')
      );
    case 2:
      return (
        writeChunk(
          destination,
          '<svg aria-hidden="true" style="display:none" id="'
        ),
        writeChunk(destination, responseState.segmentPrefix),
        writeChunk(destination, id.toString(16)),
        writeChunk(destination, '">')
      );
    case 3:
      return (
        writeChunk(
          destination,
          '<math aria-hidden="true" style="display:none" id="'
        ),
        writeChunk(destination, responseState.segmentPrefix),
        writeChunk(destination, id.toString(16)),
        writeChunk(destination, '">')
      );
    case 4:
      return (
        writeChunk(destination, '<table hidden id="'),
        writeChunk(destination, responseState.segmentPrefix),
        writeChunk(destination, id.toString(16)),
        writeChunk(destination, '">')
      );
    case 5:
      return (
        writeChunk(destination, '<table hidden><tbody id="'),
        writeChunk(destination, responseState.segmentPrefix),
        writeChunk(destination, id.toString(16)),
        writeChunk(destination, '">')
      );
    case 6:
      return (
        writeChunk(destination, '<table hidden><tr id="'),
        writeChunk(destination, responseState.segmentPrefix),
        writeChunk(destination, id.toString(16)),
        writeChunk(destination, '">')
      );
    case 7:
      return (
        writeChunk(destination, '<table hidden><colgroup id="'),
        writeChunk(destination, responseState.segmentPrefix),
        writeChunk(destination, id.toString(16)),
        writeChunk(destination, '">')
      );
    default:
      throw Error(formatProdErrorMessage(397));
  }
}
function writeEndSegment(destination, formatContext) {
  switch (formatContext.insertionMode) {
    case 0:
    case 1:
      return writeChunk(destination, "</div>");
    case 2:
      return writeChunk(destination, "</svg>");
    case 3:
      return writeChunk(destination, "</math>");
    case 4:
      return writeChunk(destination, "</table>");
    case 5:
      return writeChunk(destination, "</tbody></table>");
    case 6:
      return writeChunk(destination, "</tr></table>");
    case 7:
      return writeChunk(destination, "</colgroup></table>");
    default:
      throw Error(formatProdErrorMessage(397));
  }
}
function createResponseState$1(generateStaticMarkup, identifierPrefix) {
  identifierPrefix = void 0 === identifierPrefix ? "" : identifierPrefix;
  return {
    bootstrapChunks: [],
    startInlineScript: "<script>",
    placeholderPrefix: identifierPrefix + "P:",
    segmentPrefix: identifierPrefix + "S:",
    boundaryPrefix: identifierPrefix + "B:",
    idPrefix: identifierPrefix + "R:",
    nextSuspenseID: 0,
    sentCompleteSegmentFunction: !1,
    sentCompleteBoundaryFunction: !1,
    sentClientRenderFunction: !1,
    generateStaticMarkup: generateStaticMarkup
  };
}
var REACT_ELEMENT_TYPE = 60103,
  REACT_PORTAL_TYPE = 60106,
  REACT_FRAGMENT_TYPE = 60107,
  REACT_STRICT_MODE_TYPE = 60108,
  REACT_PROFILER_TYPE = 60114,
  REACT_PROVIDER_TYPE = 60109,
  REACT_CONTEXT_TYPE = 60110,
  REACT_FORWARD_REF_TYPE = 60112,
  REACT_SUSPENSE_TYPE = 60113,
  REACT_SUSPENSE_LIST_TYPE = 60120,
  REACT_MEMO_TYPE = 60115,
  REACT_LAZY_TYPE = 60116,
  REACT_SCOPE_TYPE = 60119,
  REACT_DEBUG_TRACING_MODE_TYPE = 60129,
  REACT_LEGACY_HIDDEN_TYPE = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  REACT_PORTAL_TYPE = symbolFor("react.portal");
  REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
  REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
  REACT_PROFILER_TYPE = symbolFor("react.profiler");
  REACT_PROVIDER_TYPE = symbolFor("react.provider");
  REACT_CONTEXT_TYPE = symbolFor("react.context");
  REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
  REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
  REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
  REACT_MEMO_TYPE = symbolFor("react.memo");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
  REACT_SCOPE_TYPE = symbolFor("react.scope");
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
  REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
}
var MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator,
  emptyContextObject = {},
  currentActiveSnapshot = null;
function popToNearestCommonAncestor(prev, next) {
  if (prev !== next) {
    prev.context._currentValue2 = prev.parentValue;
    prev = prev.parent;
    var parentNext = next.parent;
    if (null === prev) {
      if (null !== parentNext) throw Error(formatProdErrorMessage(401));
    } else {
      if (null === parentNext) throw Error(formatProdErrorMessage(401));
      popToNearestCommonAncestor(prev, parentNext);
    }
    next.context._currentValue2 = next.value;
  }
}
function popAllPrevious(prev) {
  prev.context._currentValue2 = prev.parentValue;
  prev = prev.parent;
  null !== prev && popAllPrevious(prev);
}
function pushAllNext(next) {
  var parentNext = next.parent;
  null !== parentNext && pushAllNext(parentNext);
  next.context._currentValue2 = next.value;
}
function popPreviousToCommonLevel(prev, next) {
  prev.context._currentValue2 = prev.parentValue;
  prev = prev.parent;
  if (null === prev) throw Error(formatProdErrorMessage(402));
  prev.depth === next.depth
    ? popToNearestCommonAncestor(prev, next)
    : popPreviousToCommonLevel(prev, next);
}
function popNextToCommonLevel(prev, next) {
  var parentNext = next.parent;
  if (null === parentNext) throw Error(formatProdErrorMessage(402));
  prev.depth === parentNext.depth
    ? popToNearestCommonAncestor(prev, parentNext)
    : popNextToCommonLevel(prev, parentNext);
  next.context._currentValue2 = next.value;
}
function switchContext(newSnapshot) {
  var prev = currentActiveSnapshot;
  prev !== newSnapshot &&
    (null === prev
      ? pushAllNext(newSnapshot)
      : null === newSnapshot
      ? popAllPrevious(prev)
      : prev.depth === newSnapshot.depth
      ? popToNearestCommonAncestor(prev, newSnapshot)
      : prev.depth > newSnapshot.depth
      ? popPreviousToCommonLevel(prev, newSnapshot)
      : popNextToCommonLevel(prev, newSnapshot),
    (currentActiveSnapshot = newSnapshot));
}
var classComponentUpdater = {
    isMounted: function() {
      return !1;
    },
    enqueueSetState: function(inst, payload) {
      inst = inst._reactInternals;
      null !== inst.queue && inst.queue.push(payload);
    },
    enqueueReplaceState: function(inst, payload) {
      inst = inst._reactInternals;
      inst.replace = !0;
      inst.queue = [payload];
    },
    enqueueForceUpdate: function() {}
  },
  emptyTreeContext = { id: 1, overflow: "" };
function pushTreeContext(baseContext, totalChildren, index) {
  var baseIdWithLeadingBit = baseContext.id;
  baseContext = baseContext.overflow;
  var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
  baseIdWithLeadingBit &= ~(1 << baseLength);
  index += 1;
  var length = 32 - clz32(totalChildren) + baseLength;
  if (30 < length) {
    var numberOfOverflowBits = baseLength - (baseLength % 5);
    length = (
      baseIdWithLeadingBit &
      ((1 << numberOfOverflowBits) - 1)
    ).toString(32);
    baseIdWithLeadingBit >>= numberOfOverflowBits;
    baseLength -= numberOfOverflowBits;
    return {
      id:
        (1 << (32 - clz32(totalChildren) + baseLength)) |
        (index << baseLength) |
        baseIdWithLeadingBit,
      overflow: length + baseContext
    };
  }
  return {
    id: (1 << length) | (index << baseLength) | baseIdWithLeadingBit,
    overflow: baseContext
  };
}
var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback,
  log = Math.log,
  LN2 = Math.LN2;
function clz32Fallback(x) {
  x >>>= 0;
  return 0 === x ? 32 : (31 - ((log(x) / LN2) | 0)) | 0;
}
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  currentlyRenderingComponent = null,
  currentlyRenderingTask = null,
  firstWorkInProgressHook = null,
  workInProgressHook = null,
  isReRender = !1,
  didScheduleRenderPhaseUpdate = !1,
  localIdCounter = 0,
  renderPhaseUpdates = null,
  numberOfReRenders = 0;
function resolveCurrentlyRenderingComponent() {
  if (null === currentlyRenderingComponent)
    throw Error(formatProdErrorMessage(321));
  return currentlyRenderingComponent;
}
function createHook() {
  if (0 < numberOfReRenders) throw Error(formatProdErrorMessage(312));
  return { memoizedState: null, queue: null, next: null };
}
function createWorkInProgressHook() {
  null === workInProgressHook
    ? null === firstWorkInProgressHook
      ? ((isReRender = !1),
        (firstWorkInProgressHook = workInProgressHook = createHook()))
      : ((isReRender = !0), (workInProgressHook = firstWorkInProgressHook))
    : null === workInProgressHook.next
    ? ((isReRender = !1),
      (workInProgressHook = workInProgressHook.next = createHook()))
    : ((isReRender = !0), (workInProgressHook = workInProgressHook.next));
  return workInProgressHook;
}
function resetHooksState() {
  currentlyRenderingTask = currentlyRenderingComponent = null;
  didScheduleRenderPhaseUpdate = !1;
  firstWorkInProgressHook = null;
  numberOfReRenders = 0;
  workInProgressHook = renderPhaseUpdates = null;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function useReducer(reducer, initialArg, init) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  if (isReRender) {
    var queue = workInProgressHook.queue;
    initialArg = queue.dispatch;
    if (
      null !== renderPhaseUpdates &&
      ((init = renderPhaseUpdates.get(queue)), void 0 !== init)
    ) {
      renderPhaseUpdates.delete(queue);
      queue = workInProgressHook.memoizedState;
      do (queue = reducer(queue, init.action)), (init = init.next);
      while (null !== init);
      workInProgressHook.memoizedState = queue;
      return [queue, initialArg];
    }
    return [workInProgressHook.memoizedState, initialArg];
  }
  reducer =
    reducer === basicStateReducer
      ? "function" === typeof initialArg
        ? initialArg()
        : initialArg
      : void 0 !== init
      ? init(initialArg)
      : initialArg;
  workInProgressHook.memoizedState = reducer;
  reducer = workInProgressHook.queue = { last: null, dispatch: null };
  reducer = reducer.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingComponent,
    reducer
  );
  return [workInProgressHook.memoizedState, reducer];
}
function useMemo(nextCreate, deps) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  if (null !== workInProgressHook) {
    var prevState = workInProgressHook.memoizedState;
    if (null !== prevState && null !== deps) {
      var prevDeps = prevState[1];
      a: if (null === prevDeps) prevDeps = !1;
      else {
        for (var i = 0; i < prevDeps.length && i < deps.length; i++)
          if (!objectIs(deps[i], prevDeps[i])) {
            prevDeps = !1;
            break a;
          }
        prevDeps = !0;
      }
      if (prevDeps) return prevState[0];
    }
  }
  nextCreate = nextCreate();
  workInProgressHook.memoizedState = [nextCreate, deps];
  return nextCreate;
}
function dispatchAction(componentIdentity, queue, action) {
  if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
  if (componentIdentity === currentlyRenderingComponent)
    if (
      ((didScheduleRenderPhaseUpdate = !0),
      (componentIdentity = { action: action, next: null }),
      null === renderPhaseUpdates && (renderPhaseUpdates = new Map()),
      (action = renderPhaseUpdates.get(queue)),
      void 0 === action)
    )
      renderPhaseUpdates.set(queue, componentIdentity);
    else {
      for (queue = action; null !== queue.next; ) queue = queue.next;
      queue.next = componentIdentity;
    }
}
function unsupportedStartTransition() {
  throw Error(formatProdErrorMessage(394));
}
function unsupportedRefresh() {
  throw Error(formatProdErrorMessage(393));
}
function noop() {}
var Dispatcher = {
    readContext: function(context) {
      return context._currentValue2;
    },
    useContext: function(context) {
      resolveCurrentlyRenderingComponent();
      return context._currentValue2;
    },
    useMemo: useMemo,
    useReducer: useReducer,
    useRef: function(initialValue) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      var previousRef = workInProgressHook.memoizedState;
      return null === previousRef
        ? ((initialValue = { current: initialValue }),
          (workInProgressHook.memoizedState = initialValue))
        : previousRef;
    },
    useState: function(initialState) {
      return useReducer(basicStateReducer, initialState);
    },
    useInsertionEffect: noop,
    useLayoutEffect: function() {},
    useCallback: function(callback, deps) {
      return useMemo(function() {
        return callback;
      }, deps);
    },
    useImperativeHandle: noop,
    useEffect: noop,
    useDebugValue: noop,
    useDeferredValue: function(value) {
      resolveCurrentlyRenderingComponent();
      return value;
    },
    useTransition: function() {
      resolveCurrentlyRenderingComponent();
      return [!1, unsupportedStartTransition];
    },
    useId: function() {
      var JSCompiler_inline_result = currentlyRenderingTask.treeContext;
      var overflow = JSCompiler_inline_result.overflow;
      JSCompiler_inline_result = JSCompiler_inline_result.id;
      JSCompiler_inline_result =
        (
          JSCompiler_inline_result &
          ~(1 << (32 - clz32(JSCompiler_inline_result) - 1))
        ).toString(32) + overflow;
      var responseState = currentResponseState;
      if (null === responseState) throw Error(formatProdErrorMessage(404));
      overflow = localIdCounter++;
      JSCompiler_inline_result =
        responseState.idPrefix + JSCompiler_inline_result;
      0 < overflow && (JSCompiler_inline_result += ":" + overflow.toString(32));
      return JSCompiler_inline_result;
    },
    useMutableSource: function(source, getSnapshot) {
      resolveCurrentlyRenderingComponent();
      return getSnapshot(source._source);
    },
    useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
      if (void 0 === getServerSnapshot)
        throw Error(formatProdErrorMessage(407));
      return getServerSnapshot();
    },
    getCacheForType: function() {
      throw Error(formatProdErrorMessage(248));
    },
    useCacheRefresh: function() {
      return unsupportedRefresh;
    }
  },
  currentResponseState = null,
  ReactCurrentDispatcher$1 =
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
      .ReactCurrentDispatcher;
function defaultErrorHandler(error) {
  console.error(error);
}
function noop$1() {}
function createRequest(
  children,
  responseState,
  rootFormatContext,
  progressiveChunkSize,
  onError,
  onCompleteAll,
  onCompleteShell,
  onErrorShell
) {
  var pingedTasks = [],
    abortSet = new Set();
  responseState = {
    destination: null,
    responseState: responseState,
    progressiveChunkSize:
      void 0 === progressiveChunkSize ? 12800 : progressiveChunkSize,
    status: 0,
    fatalError: null,
    nextSegmentId: 0,
    allPendingTasks: 0,
    pendingRootTasks: 0,
    completedRootSegment: null,
    abortableTasks: abortSet,
    pingedTasks: pingedTasks,
    clientRenderedBoundaries: [],
    completedBoundaries: [],
    partialBoundaries: [],
    onError: void 0 === onError ? defaultErrorHandler : onError,
    onCompleteAll: void 0 === onCompleteAll ? noop$1 : onCompleteAll,
    onCompleteShell: void 0 === onCompleteShell ? noop$1 : onCompleteShell,
    onErrorShell: void 0 === onErrorShell ? noop$1 : onErrorShell
  };
  rootFormatContext = createPendingSegment(
    responseState,
    0,
    null,
    rootFormatContext
  );
  rootFormatContext.parentFlushed = !0;
  children = createTask(
    responseState,
    children,
    null,
    rootFormatContext,
    abortSet,
    emptyContextObject,
    null,
    emptyTreeContext
  );
  pingedTasks.push(children);
  return responseState;
}
function createTask(
  request,
  node,
  blockedBoundary,
  blockedSegment,
  abortSet,
  legacyContext,
  context,
  treeContext
) {
  request.allPendingTasks++;
  null === blockedBoundary
    ? request.pendingRootTasks++
    : blockedBoundary.pendingTasks++;
  var task = {
    node: node,
    ping: function() {
      var pingedTasks = request.pingedTasks;
      pingedTasks.push(task);
      1 === pingedTasks.length && performWork(request);
    },
    blockedBoundary: blockedBoundary,
    blockedSegment: blockedSegment,
    abortSet: abortSet,
    legacyContext: legacyContext,
    context: context,
    treeContext: treeContext
  };
  abortSet.add(task);
  return task;
}
function createPendingSegment(request, index, boundary, formatContext) {
  return {
    status: 0,
    id: -1,
    index: index,
    parentFlushed: !1,
    chunks: [],
    children: [],
    formatContext: formatContext,
    boundary: boundary
  };
}
function logRecoverableError(request, error) {
  request = request.onError;
  request(error);
}
function fatalError(request, error) {
  var onErrorShell = request.onErrorShell;
  onErrorShell(error);
  null !== request.destination
    ? ((request.status = 2), request.destination.destroy(error))
    : ((request.status = 1), (request.fatalError = error));
}
function renderWithHooks(request, task, Component, props, secondArg) {
  currentlyRenderingComponent = {};
  currentlyRenderingTask = task;
  localIdCounter = 0;
  for (request = Component(props, secondArg); didScheduleRenderPhaseUpdate; )
    (didScheduleRenderPhaseUpdate = !1),
      (localIdCounter = 0),
      (numberOfReRenders += 1),
      (workInProgressHook = null),
      (request = Component(props, secondArg));
  resetHooksState();
  return request;
}
function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    baseProps = Object.assign({}, baseProps);
    Component = Component.defaultProps;
    for (var propName in Component)
      void 0 === baseProps[propName] &&
        (baseProps[propName] = Component[propName]);
    return baseProps;
  }
  return baseProps;
}
function renderElement(request, task, type, props, ref) {
  if ("function" === typeof type)
    if (type.prototype && type.prototype.isReactComponent) {
      ref = emptyContextObject;
      var contextType = type.contextType;
      "object" === typeof contextType &&
        null !== contextType &&
        (ref = contextType._currentValue2);
      ref = new type(props, ref);
      var initialState = void 0 !== ref.state ? ref.state : null;
      ref.updater = classComponentUpdater;
      ref.props = props;
      ref.state = initialState;
      contextType = { queue: [], replace: !1 };
      ref._reactInternals = contextType;
      var contextType$jscomp$0 = type.contextType;
      ref.context =
        "object" === typeof contextType$jscomp$0 &&
        null !== contextType$jscomp$0
          ? contextType$jscomp$0._currentValue2
          : emptyContextObject;
      contextType$jscomp$0 = type.getDerivedStateFromProps;
      "function" === typeof contextType$jscomp$0 &&
        ((contextType$jscomp$0 = contextType$jscomp$0(props, initialState)),
        (initialState =
          null === contextType$jscomp$0 || void 0 === contextType$jscomp$0
            ? initialState
            : Object.assign({}, initialState, contextType$jscomp$0)),
        (ref.state = initialState));
      if (
        "function" !== typeof type.getDerivedStateFromProps &&
        "function" !== typeof ref.getSnapshotBeforeUpdate &&
        ("function" === typeof ref.UNSAFE_componentWillMount ||
          "function" === typeof ref.componentWillMount)
      )
        if (
          ((type = ref.state),
          "function" === typeof ref.componentWillMount &&
            ref.componentWillMount(),
          "function" === typeof ref.UNSAFE_componentWillMount &&
            ref.UNSAFE_componentWillMount(),
          type !== ref.state &&
            classComponentUpdater.enqueueReplaceState(ref, ref.state, null),
          null !== contextType.queue && 0 < contextType.queue.length)
        )
          if (
            ((type = contextType.queue),
            (contextType$jscomp$0 = contextType.replace),
            (contextType.queue = null),
            (contextType.replace = !1),
            contextType$jscomp$0 && 1 === type.length)
          )
            ref.state = type[0];
          else {
            contextType = contextType$jscomp$0 ? type[0] : ref.state;
            initialState = !0;
            for (
              contextType$jscomp$0 = contextType$jscomp$0 ? 1 : 0;
              contextType$jscomp$0 < type.length;
              contextType$jscomp$0++
            ) {
              var partial = type[contextType$jscomp$0];
              partial =
                "function" === typeof partial
                  ? partial.call(ref, contextType, props, void 0)
                  : partial;
              null != partial &&
                (initialState
                  ? ((initialState = !1),
                    (contextType = Object.assign({}, contextType, partial)))
                  : Object.assign(contextType, partial));
            }
            ref.state = contextType;
          }
        else contextType.queue = null;
      props = ref.render();
      renderNodeDestructive(request, task, props);
    } else if (
      ((props = renderWithHooks(request, task, type, props, void 0)),
      0 !== localIdCounter)
    ) {
      type = task.treeContext;
      task.treeContext = pushTreeContext(type, 1, 0);
      try {
        renderNodeDestructive(request, task, props);
      } finally {
        task.treeContext = type;
      }
    } else renderNodeDestructive(request, task, props);
  else if ("string" === typeof type)
    switch (
      ((ref = task.blockedSegment),
      (contextType = pushStartInstance(
        ref.chunks,
        type,
        props,
        request.responseState,
        ref.formatContext
      )),
      (initialState = ref.formatContext),
      (ref.formatContext = getChildFormatContext(initialState, type, props)),
      renderNode(request, task, contextType),
      (ref.formatContext = initialState),
      type)
    ) {
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "input":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        break;
      default:
        ref.chunks.push("</", type, ">");
    }
  else {
    switch (type) {
      case REACT_LEGACY_HIDDEN_TYPE:
      case REACT_DEBUG_TRACING_MODE_TYPE:
      case REACT_STRICT_MODE_TYPE:
      case REACT_PROFILER_TYPE:
      case REACT_FRAGMENT_TYPE:
        renderNodeDestructive(request, task, props.children);
        return;
      case REACT_SUSPENSE_LIST_TYPE:
        renderNodeDestructive(request, task, props.children);
        return;
      case REACT_SCOPE_TYPE:
        renderNodeDestructive(request, task, props.children);
        return;
      case REACT_SUSPENSE_TYPE:
        a: {
          type = task.blockedBoundary;
          ref = task.blockedSegment;
          contextType = props.fallback;
          props = props.children;
          initialState = new Set();
          contextType$jscomp$0 = {
            id: null,
            rootSegmentID: -1,
            parentFlushed: !1,
            pendingTasks: 0,
            forceClientRender: !1,
            completedSegments: [],
            byteSize: 0,
            fallbackAbortableTasks: initialState
          };
          partial = createPendingSegment(
            request,
            ref.chunks.length,
            contextType$jscomp$0,
            ref.formatContext
          );
          ref.children.push(partial);
          var contentRootSegment = createPendingSegment(
            request,
            0,
            null,
            ref.formatContext
          );
          contentRootSegment.parentFlushed = !0;
          task.blockedBoundary = contextType$jscomp$0;
          task.blockedSegment = contentRootSegment;
          try {
            if (
              (renderNode(request, task, props),
              (contentRootSegment.status = 1),
              contextType$jscomp$0.completedSegments.push(contentRootSegment),
              0 === contextType$jscomp$0.pendingTasks)
            )
              break a;
          } catch (error) {
            (contentRootSegment.status = 4),
              logRecoverableError(request, error),
              (contextType$jscomp$0.forceClientRender = !0);
          } finally {
            (task.blockedBoundary = type), (task.blockedSegment = ref);
          }
          task = createTask(
            request,
            contextType,
            type,
            partial,
            initialState,
            task.legacyContext,
            task.context,
            task.treeContext
          );
          request.pingedTasks.push(task);
        }
        return;
    }
    if ("object" === typeof type && null !== type)
      switch (type.$$typeof) {
        case REACT_FORWARD_REF_TYPE:
          props = renderWithHooks(request, task, type.render, props, ref);
          if (0 !== localIdCounter) {
            type = task.treeContext;
            task.treeContext = pushTreeContext(type, 1, 0);
            try {
              renderNodeDestructive(request, task, props);
            } finally {
              task.treeContext = type;
            }
          } else renderNodeDestructive(request, task, props);
          return;
        case REACT_MEMO_TYPE:
          type = type.type;
          props = resolveDefaultProps(type, props);
          renderElement(request, task, type, props, ref);
          return;
        case REACT_PROVIDER_TYPE:
          ref = props.children;
          type = type._context;
          props = props.value;
          contextType = type._currentValue2;
          type._currentValue2 = props;
          initialState = currentActiveSnapshot;
          currentActiveSnapshot = props = {
            parent: initialState,
            depth: null === initialState ? 0 : initialState.depth + 1,
            context: type,
            parentValue: contextType,
            value: props
          };
          task.context = props;
          renderNodeDestructive(request, task, ref);
          request = currentActiveSnapshot;
          if (null === request) throw Error(formatProdErrorMessage(403));
          request.context._currentValue2 = request.parentValue;
          request = currentActiveSnapshot = request.parent;
          task.context = request;
          return;
        case REACT_CONTEXT_TYPE:
          props = props.children;
          props = props(type._currentValue2);
          renderNodeDestructive(request, task, props);
          return;
        case REACT_LAZY_TYPE:
          ref = type._init;
          type = ref(type._payload);
          props = resolveDefaultProps(type, props);
          renderElement(request, task, type, props, void 0);
          return;
      }
    throw Error(
      formatProdErrorMessage(130, null == type ? type : typeof type, "")
    );
  }
}
function renderNodeDestructive(request, task, node) {
  task.node = node;
  if ("object" === typeof node && null !== node) {
    switch (node.$$typeof) {
      case REACT_ELEMENT_TYPE:
        renderElement(request, task, node.type, node.props, node.ref);
        return;
      case REACT_PORTAL_TYPE:
        throw Error(formatProdErrorMessage(257));
      case REACT_LAZY_TYPE:
        var init = node._init;
        node = init(node._payload);
        renderNodeDestructive(request, task, node);
        return;
    }
    if (isArrayImpl(node)) {
      renderChildrenArray(request, task, node);
      return;
    }
    null === node || "object" !== typeof node
      ? (init = null)
      : ((init =
          (MAYBE_ITERATOR_SYMBOL && node[MAYBE_ITERATOR_SYMBOL]) ||
          node["@@iterator"]),
        (init = "function" === typeof init ? init : null));
    if (init && (init = init.call(node))) {
      node = init.next();
      if (!node.done) {
        var children = [];
        do children.push(node.value), (node = init.next());
        while (!node.done);
        renderChildrenArray(request, task, children);
      }
      return;
    }
    request = Object.prototype.toString.call(node);
    throw Error(
      formatProdErrorMessage(
        31,
        "[object Object]" === request
          ? "object with keys {" + Object.keys(node).join(", ") + "}"
          : request
      )
    );
  }
  "string" === typeof node
    ? ((task = task.blockedSegment.chunks),
      request.responseState.generateStaticMarkup
        ? task.push(escapeTextForBrowser(node))
        : pushTextInstance(task, node))
    : "number" === typeof node &&
      ((task = task.blockedSegment.chunks),
      (node = "" + node),
      request.responseState.generateStaticMarkup
        ? task.push(escapeTextForBrowser(node))
        : pushTextInstance(task, node));
}
function renderChildrenArray(request, task, children) {
  for (var totalChildren = children.length, i = 0; i < totalChildren; i++) {
    var prevTreeContext = task.treeContext;
    task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
    try {
      renderNode(request, task, children[i]);
    } finally {
      task.treeContext = prevTreeContext;
    }
  }
}
function renderNode(request, task, node) {
  var previousFormatContext = task.blockedSegment.formatContext,
    previousLegacyContext = task.legacyContext,
    previousContext = task.context;
  try {
    return renderNodeDestructive(request, task, node);
  } catch (x) {
    if (
      (resetHooksState(),
      "object" === typeof x && null !== x && "function" === typeof x.then)
    ) {
      node = x;
      var segment = task.blockedSegment,
        newSegment = createPendingSegment(
          request,
          segment.chunks.length,
          null,
          segment.formatContext
        );
      segment.children.push(newSegment);
      request = createTask(
        request,
        task.node,
        task.blockedBoundary,
        newSegment,
        task.abortSet,
        task.legacyContext,
        task.context,
        task.treeContext
      ).ping;
      node.then(request, request);
      task.blockedSegment.formatContext = previousFormatContext;
      task.legacyContext = previousLegacyContext;
      task.context = previousContext;
      switchContext(previousContext);
    } else
      throw ((task.blockedSegment.formatContext = previousFormatContext),
      (task.legacyContext = previousLegacyContext),
      (task.context = previousContext),
      switchContext(previousContext),
      x);
  }
}
function abortTaskSoft(task) {
  var boundary = task.blockedBoundary;
  task = task.blockedSegment;
  task.status = 3;
  finishedTask(this, boundary, task);
}
function abortTask(task) {
  var boundary = task.blockedBoundary;
  task.blockedSegment.status = 3;
  null === boundary
    ? (this.allPendingTasks--,
      2 !== this.status &&
        ((this.status = 2),
        null !== this.destination && this.destination.push(null)))
    : (boundary.pendingTasks--,
      boundary.forceClientRender ||
        ((boundary.forceClientRender = !0),
        boundary.parentFlushed && this.clientRenderedBoundaries.push(boundary)),
      boundary.fallbackAbortableTasks.forEach(abortTask, this),
      boundary.fallbackAbortableTasks.clear(),
      this.allPendingTasks--,
      0 === this.allPendingTasks && ((task = this.onCompleteAll), task()));
}
function finishedTask(request, boundary, segment) {
  if (null === boundary) {
    if (segment.parentFlushed) {
      if (null !== request.completedRootSegment)
        throw Error(formatProdErrorMessage(389));
      request.completedRootSegment = segment;
    }
    request.pendingRootTasks--;
    0 === request.pendingRootTasks &&
      ((request.onErrorShell = noop$1),
      (boundary = request.onCompleteShell),
      boundary());
  } else if ((boundary.pendingTasks--, !boundary.forceClientRender))
    if (0 === boundary.pendingTasks)
      segment.parentFlushed &&
        1 === segment.status &&
        boundary.completedSegments.push(segment),
        boundary.parentFlushed && request.completedBoundaries.push(boundary),
        boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request),
        boundary.fallbackAbortableTasks.clear();
    else if (segment.parentFlushed && 1 === segment.status) {
      var completedSegments = boundary.completedSegments;
      completedSegments.push(segment);
      1 === completedSegments.length &&
        boundary.parentFlushed &&
        request.partialBoundaries.push(boundary);
    }
  request.allPendingTasks--;
  0 === request.allPendingTasks &&
    ((request = request.onCompleteAll), request());
}
function performWork(request$jscomp$0) {
  if (2 !== request$jscomp$0.status) {
    var prevContext = currentActiveSnapshot,
      prevDispatcher = ReactCurrentDispatcher$1.current;
    ReactCurrentDispatcher$1.current = Dispatcher;
    var prevResponseState = currentResponseState;
    currentResponseState = request$jscomp$0.responseState;
    try {
      var pingedTasks = request$jscomp$0.pingedTasks,
        i;
      for (i = 0; i < pingedTasks.length; i++) {
        var task = pingedTasks[i];
        var request = request$jscomp$0,
          segment = task.blockedSegment;
        if (0 === segment.status) {
          switchContext(task.context);
          try {
            renderNodeDestructive(request, task, task.node),
              task.abortSet.delete(task),
              (segment.status = 1),
              finishedTask(request, task.blockedBoundary, segment);
          } catch (x) {
            if (
              (resetHooksState(),
              "object" === typeof x &&
                null !== x &&
                "function" === typeof x.then)
            ) {
              var ping = task.ping;
              x.then(ping, ping);
            } else {
              task.abortSet.delete(task);
              segment.status = 4;
              var boundary = task.blockedBoundary,
                error$jscomp$0 = x;
              logRecoverableError(request, error$jscomp$0);
              null === boundary
                ? fatalError(request, error$jscomp$0)
                : (boundary.pendingTasks--,
                  boundary.forceClientRender ||
                    ((boundary.forceClientRender = !0),
                    boundary.parentFlushed &&
                      request.clientRenderedBoundaries.push(boundary)));
              request.allPendingTasks--;
              if (0 === request.allPendingTasks) {
                var onCompleteAll = request.onCompleteAll;
                onCompleteAll();
              }
            }
          } finally {
          }
        }
      }
      pingedTasks.splice(0, i);
      null !== request$jscomp$0.destination &&
        flushCompletedQueues(request$jscomp$0, request$jscomp$0.destination);
    } catch (error) {
      logRecoverableError(request$jscomp$0, error),
        fatalError(request$jscomp$0, error);
    } finally {
      (currentResponseState = prevResponseState),
        (ReactCurrentDispatcher$1.current = prevDispatcher),
        prevDispatcher === Dispatcher && switchContext(prevContext);
    }
  }
}
function flushSubtree(request, destination, segment) {
  segment.parentFlushed = !0;
  switch (segment.status) {
    case 0:
      var segmentID = (segment.id = request.nextSegmentId++);
      request = request.responseState;
      writeChunk(destination, '<template id="');
      writeChunk(destination, request.placeholderPrefix);
      request = segmentID.toString(16);
      writeChunk(destination, request);
      return writeChunk(destination, '"></template>');
    case 1:
      segment.status = 2;
      var r = !0;
      segmentID = segment.chunks;
      var chunkIdx = 0;
      segment = segment.children;
      for (var childIdx = 0; childIdx < segment.length; childIdx++) {
        for (r = segment[childIdx]; chunkIdx < r.index; chunkIdx++)
          writeChunk(destination, segmentID[chunkIdx]);
        r = flushSegment(request, destination, r);
      }
      for (; chunkIdx < segmentID.length; chunkIdx++)
        r = writeChunk(destination, segmentID[chunkIdx]);
      return r;
    default:
      throw Error(formatProdErrorMessage(390));
  }
}
function flushSegment(request, destination, segment) {
  var boundary = segment.boundary;
  if (null === boundary) return flushSubtree(request, destination, segment);
  boundary.parentFlushed = !0;
  if (boundary.forceClientRender)
    return (
      request.responseState.generateStaticMarkup ||
        writeChunk(destination, "\x3c!--$!--\x3e"),
      flushSubtree(request, destination, segment),
      (request = request.responseState.generateStaticMarkup
        ? !0
        : writeChunk(destination, "\x3c!--/$--\x3e")),
      request
    );
  if (0 < boundary.pendingTasks) {
    boundary.rootSegmentID = request.nextSegmentId++;
    0 < boundary.completedSegments.length &&
      request.partialBoundaries.push(boundary);
    var JSCompiler_inline_result = request.responseState;
    var generatedID = JSCompiler_inline_result.nextSuspenseID++;
    JSCompiler_inline_result =
      JSCompiler_inline_result.boundaryPrefix + generatedID.toString(16);
    boundary = boundary.id = JSCompiler_inline_result;
    writeStartPendingSuspenseBoundary(
      destination,
      request.responseState,
      boundary
    );
    flushSubtree(request, destination, segment);
    return writeChunk(destination, "\x3c!--/$--\x3e");
  }
  if (boundary.byteSize > request.progressiveChunkSize)
    return (
      (boundary.rootSegmentID = request.nextSegmentId++),
      request.completedBoundaries.push(boundary),
      writeStartPendingSuspenseBoundary(
        destination,
        request.responseState,
        boundary.id
      ),
      flushSubtree(request, destination, segment),
      writeChunk(destination, "\x3c!--/$--\x3e")
    );
  request.responseState.generateStaticMarkup ||
    writeChunk(destination, "\x3c!--$--\x3e");
  segment = boundary.completedSegments;
  if (1 !== segment.length) throw Error(formatProdErrorMessage(391));
  flushSegment(request, destination, segment[0]);
  request = request.responseState.generateStaticMarkup
    ? !0
    : writeChunk(destination, "\x3c!--/$--\x3e");
  return request;
}
function flushSegmentContainer(request, destination, segment) {
  writeStartSegment(
    destination,
    request.responseState,
    segment.formatContext,
    segment.id
  );
  flushSegment(request, destination, segment);
  return writeEndSegment(destination, segment.formatContext);
}
function flushCompletedBoundary(request, destination, boundary) {
  for (
    var completedSegments = boundary.completedSegments, i = 0;
    i < completedSegments.length;
    i++
  )
    flushPartiallyCompletedSegment(
      request,
      destination,
      boundary,
      completedSegments[i]
    );
  completedSegments.length = 0;
  request = request.responseState;
  completedSegments = boundary.id;
  boundary = boundary.rootSegmentID;
  writeChunk(destination, request.startInlineScript);
  request.sentCompleteBoundaryFunction
    ? writeChunk(destination, '$RC("')
    : ((request.sentCompleteBoundaryFunction = !0),
      writeChunk(
        destination,
        'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'
      ));
  if (null === completedSegments) throw Error(formatProdErrorMessage(395));
  boundary = boundary.toString(16);
  writeChunk(destination, completedSegments);
  writeChunk(destination, '","');
  writeChunk(destination, request.segmentPrefix);
  writeChunk(destination, boundary);
  return writeChunk(destination, '")\x3c/script>');
}
function flushPartiallyCompletedSegment(
  request,
  destination,
  boundary,
  segment
) {
  if (2 === segment.status) return !0;
  var segmentID = segment.id;
  if (-1 === segmentID) {
    if (-1 === (segment.id = boundary.rootSegmentID))
      throw Error(formatProdErrorMessage(392));
    return flushSegmentContainer(request, destination, segment);
  }
  flushSegmentContainer(request, destination, segment);
  request = request.responseState;
  writeChunk(destination, request.startInlineScript);
  request.sentCompleteSegmentFunction
    ? writeChunk(destination, '$RS("')
    : ((request.sentCompleteSegmentFunction = !0),
      writeChunk(
        destination,
        'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'
      ));
  writeChunk(destination, request.segmentPrefix);
  segmentID = segmentID.toString(16);
  writeChunk(destination, segmentID);
  writeChunk(destination, '","');
  writeChunk(destination, request.placeholderPrefix);
  writeChunk(destination, segmentID);
  return writeChunk(destination, '")\x3c/script>');
}
function flushCompletedQueues(request, destination) {
  try {
    var completedRootSegment = request.completedRootSegment;
    if (null !== completedRootSegment && 0 === request.pendingRootTasks) {
      flushSegment(request, destination, completedRootSegment);
      request.completedRootSegment = null;
      var bootstrapChunks = request.responseState.bootstrapChunks;
      for (
        completedRootSegment = 0;
        completedRootSegment < bootstrapChunks.length;
        completedRootSegment++
      )
        writeChunk(destination, bootstrapChunks[completedRootSegment]);
    }
    var clientRenderedBoundaries = request.clientRenderedBoundaries,
      i;
    for (i = 0; i < clientRenderedBoundaries.length; i++) {
      bootstrapChunks = destination;
      var responseState = request.responseState,
        boundaryID = clientRenderedBoundaries[i].id;
      writeChunk(bootstrapChunks, responseState.startInlineScript);
      responseState.sentClientRenderFunction
        ? writeChunk(bootstrapChunks, '$RX("')
        : ((responseState.sentClientRenderFunction = !0),
          writeChunk(
            bootstrapChunks,
            'function $RX(a){if(a=document.getElementById(a))a=a.previousSibling,a.data="$!",a._reactRetry&&a._reactRetry()};$RX("'
          ));
      if (null === boundaryID) throw Error(formatProdErrorMessage(395));
      writeChunk(bootstrapChunks, boundaryID);
      if (!writeChunk(bootstrapChunks, '")\x3c/script>')) {
        request.destination = null;
        i++;
        clientRenderedBoundaries.splice(0, i);
        return;
      }
    }
    clientRenderedBoundaries.splice(0, i);
    var completedBoundaries = request.completedBoundaries;
    for (i = 0; i < completedBoundaries.length; i++)
      if (
        !flushCompletedBoundary(request, destination, completedBoundaries[i])
      ) {
        request.destination = null;
        i++;
        completedBoundaries.splice(0, i);
        return;
      }
    completedBoundaries.splice(0, i);
    var partialBoundaries = request.partialBoundaries;
    for (i = 0; i < partialBoundaries.length; i++) {
      var boundary$6 = partialBoundaries[i];
      a: {
        clientRenderedBoundaries = request;
        responseState = destination;
        var completedSegments = boundary$6.completedSegments;
        for (
          boundaryID = 0;
          boundaryID < completedSegments.length;
          boundaryID++
        )
          if (
            !flushPartiallyCompletedSegment(
              clientRenderedBoundaries,
              responseState,
              boundary$6,
              completedSegments[boundaryID]
            )
          ) {
            boundaryID++;
            completedSegments.splice(0, boundaryID);
            var JSCompiler_inline_result = !1;
            break a;
          }
        completedSegments.splice(0, boundaryID);
        JSCompiler_inline_result = !0;
      }
      if (!JSCompiler_inline_result) {
        request.destination = null;
        i++;
        partialBoundaries.splice(0, i);
        return;
      }
    }
    partialBoundaries.splice(0, i);
    var largeBoundaries = request.completedBoundaries;
    for (i = 0; i < largeBoundaries.length; i++)
      if (!flushCompletedBoundary(request, destination, largeBoundaries[i])) {
        request.destination = null;
        i++;
        largeBoundaries.splice(0, i);
        return;
      }
    largeBoundaries.splice(0, i);
  } finally {
    0 === request.allPendingTasks &&
      0 === request.pingedTasks.length &&
      0 === request.clientRenderedBoundaries.length &&
      0 === request.completedBoundaries.length &&
      destination.push(null);
  }
}
function abort(request) {
  try {
    var abortableTasks = request.abortableTasks;
    abortableTasks.forEach(abortTask, request);
    abortableTasks.clear();
    null !== request.destination &&
      flushCompletedQueues(request, request.destination);
  } catch (error) {
    logRecoverableError(request, error), fatalError(request, error);
  }
}
function onError() {}
function renderToStringImpl(children, options, generateStaticMarkup) {
  var didFatal = !1,
    fatalError$jscomp$0 = null,
    result = "",
    destination = {
      push: function(chunk) {
        null !== chunk && (result += chunk);
        return !0;
      },
      destroy: function(error) {
        didFatal = !0;
        fatalError$jscomp$0 = error;
      }
    },
    readyToStream = !1;
  children = createRequest(
    children,
    createResponseState$1(
      generateStaticMarkup,
      options ? options.identifierPrefix : void 0
    ),
    { insertionMode: 1, selectedValue: null },
    Infinity,
    onError,
    void 0,
    function() {
      readyToStream = !0;
    }
  );
  performWork(children);
  abort(children);
  if (1 === children.status)
    (children.status = 2), destination.destroy(children.fatalError);
  else if (2 !== children.status) {
    children.destination = destination;
    try {
      flushCompletedQueues(children, destination);
    } catch (error) {
      logRecoverableError(children, error), fatalError(children, error);
    }
  }
  if (didFatal) throw fatalError$jscomp$0;
  if (!readyToStream) throw Error(formatProdErrorMessage(342));
  return result;
}
exports.renderToNodeStream = function() {
  throw Error(formatProdErrorMessage(207));
};
exports.renderToStaticMarkup = function(children, options) {
  return renderToStringImpl(children, options, !0);
};
exports.renderToStaticNodeStream = function() {
  throw Error(formatProdErrorMessage(208));
};
exports.renderToString = function(children, options) {
  return renderToStringImpl(children, options, !1);
};
exports.version = "17.0.3";
