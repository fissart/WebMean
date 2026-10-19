import {
  GeminiChatComponent
} from "./chunk-QMNH6UDY.js";
import {
  ExportToExcelComponent,
  enUS,
  es,
  format,
  getDefaultOptions,
  getTimezoneOffsetInMilliseconds,
  isValid,
  normalizeDates
} from "./chunk-V7MTO3MG.js";
import {
  constructFrom,
  minutesInDay,
  minutesInMonth,
  parseISO,
  toDate
} from "./chunk-Y6ZT7BXL.js";
import {
  MathRendererDirective
} from "./chunk-DK4ZT7VK.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor,
  RequiredValidator
} from "./chunk-OAEVIACX.js";
import {
  ToastrService
} from "./chunk-JEAYVHF3.js";
import {
  environment
} from "./chunk-5ESGTH3B.js";
import {
  MarkdownModule,
  takeUntilDestroyed
} from "./chunk-3QOIHUY2.js";
import {
  Navbar
} from "./chunk-U3CDTOVP.js";
import "./chunk-DJCOHPHY.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-PFU5G7MY.js";
import {
  HttpClient
} from "./chunk-MMWGUNZC.js";
import {
  CommonModule
} from "./chunk-6QD4DAAM.js";
import {
  Component,
  DestroyRef,
  ViewChild,
  computed,
  firstValueFrom,
  inject,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuerySignal
} from "./chunk-FXWIEX65.js";
import {
  __spreadValues
} from "./chunk-3WPM564S.js";

// node_modules/date-fns/compareAsc.js
function compareAsc(dateLeft, dateRight) {
  const diff = +toDate(dateLeft) - +toDate(dateRight);
  if (diff < 0) return -1;
  else if (diff > 0) return 1;
  return diff;
}

// node_modules/date-fns/constructNow.js
function constructNow(date) {
  return constructFrom(date, Date.now());
}

// node_modules/date-fns/differenceInCalendarMonths.js
function differenceInCalendarMonths(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
  const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();
  return yearsDiff * 12 + monthsDiff;
}

// node_modules/date-fns/_lib/getRoundingMethod.js
function getRoundingMethod(method) {
  return (number) => {
    const round = method ? Math[method] : Math.trunc;
    const result = round(number);
    return result === 0 ? 0 : result;
  };
}

// node_modules/date-fns/differenceInMilliseconds.js
function differenceInMilliseconds(laterDate, earlierDate) {
  return +toDate(laterDate) - +toDate(earlierDate);
}

// node_modules/date-fns/endOfDay.js
function endOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/date-fns/endOfMonth.js
function endOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/date-fns/isLastDayOfMonth.js
function isLastDayOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  return +endOfDay(_date, options) === +endOfMonth(_date, options);
}

// node_modules/date-fns/differenceInMonths.js
function differenceInMonths(laterDate, earlierDate, options) {
  const [laterDate_, workingLaterDate, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    laterDate,
    earlierDate
  );
  const sign = compareAsc(workingLaterDate, earlierDate_);
  const difference = Math.abs(
    differenceInCalendarMonths(workingLaterDate, earlierDate_)
  );
  if (difference < 1) return 0;
  if (workingLaterDate.getMonth() === 1 && workingLaterDate.getDate() > 27)
    workingLaterDate.setDate(30);
  workingLaterDate.setMonth(workingLaterDate.getMonth() - sign * difference);
  let isLastMonthNotFull = compareAsc(workingLaterDate, earlierDate_) === -sign;
  if (isLastDayOfMonth(laterDate_) && difference === 1 && compareAsc(laterDate_, earlierDate_) === 1) {
    isLastMonthNotFull = false;
  }
  const result = sign * (difference - +isLastMonthNotFull);
  return result === 0 ? 0 : result;
}

// node_modules/date-fns/differenceInSeconds.js
function differenceInSeconds(laterDate, earlierDate, options) {
  const diff = differenceInMilliseconds(laterDate, earlierDate) / 1e3;
  return getRoundingMethod(options?.roundingMethod)(diff);
}

// node_modules/date-fns/formatDistance.js
function formatDistance(laterDate, earlierDate, options) {
  const defaultOptions = getDefaultOptions();
  const locale = options?.locale ?? defaultOptions.locale ?? enUS;
  const minutesInAlmostTwoDays = 2520;
  const comparison = compareAsc(laterDate, earlierDate);
  if (isNaN(comparison)) throw new RangeError("Invalid time value");
  const localizeOptions = Object.assign({}, options, {
    addSuffix: options?.addSuffix,
    comparison
  });
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    ...comparison > 0 ? [earlierDate, laterDate] : [laterDate, earlierDate]
  );
  const seconds = differenceInSeconds(earlierDate_, laterDate_);
  const offsetInSeconds = (getTimezoneOffsetInMilliseconds(earlierDate_) - getTimezoneOffsetInMilliseconds(laterDate_)) / 1e3;
  const minutes = Math.round((seconds - offsetInSeconds) / 60);
  let months;
  if (minutes < 2) {
    if (options?.includeSeconds) {
      if (seconds < 5) {
        return locale.formatDistance("lessThanXSeconds", 5, localizeOptions);
      } else if (seconds < 10) {
        return locale.formatDistance("lessThanXSeconds", 10, localizeOptions);
      } else if (seconds < 20) {
        return locale.formatDistance("lessThanXSeconds", 20, localizeOptions);
      } else if (seconds < 40) {
        return locale.formatDistance("halfAMinute", 0, localizeOptions);
      } else if (seconds < 60) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", minutes, localizeOptions);
      }
    }
  } else if (minutes < 45) {
    return locale.formatDistance("xMinutes", minutes, localizeOptions);
  } else if (minutes < 90) {
    return locale.formatDistance("aboutXHours", 1, localizeOptions);
  } else if (minutes < minutesInDay) {
    const hours = Math.round(minutes / 60);
    return locale.formatDistance("aboutXHours", hours, localizeOptions);
  } else if (minutes < minutesInAlmostTwoDays) {
    return locale.formatDistance("xDays", 1, localizeOptions);
  } else if (minutes < minutesInMonth) {
    const days = Math.round(minutes / minutesInDay);
    return locale.formatDistance("xDays", days, localizeOptions);
  } else if (minutes < minutesInMonth * 2) {
    months = Math.round(minutes / minutesInMonth);
    return locale.formatDistance("aboutXMonths", months, localizeOptions);
  }
  months = differenceInMonths(earlierDate_, laterDate_);
  if (months < 12) {
    const nearestMonth = Math.round(minutes / minutesInMonth);
    return locale.formatDistance("xMonths", nearestMonth, localizeOptions);
  } else {
    const monthsSinceStartOfYear = months % 12;
    const years = Math.trunc(months / 12);
    if (monthsSinceStartOfYear < 3) {
      return locale.formatDistance("aboutXYears", years, localizeOptions);
    } else if (monthsSinceStartOfYear < 9) {
      return locale.formatDistance("overXYears", years, localizeOptions);
    } else {
      return locale.formatDistance("almostXYears", years + 1, localizeOptions);
    }
  }
}

// node_modules/date-fns/formatDistanceToNow.js
function formatDistanceToNow(date, options) {
  return formatDistance(date, constructNow(date), options);
}

// src/app/componentes/actualizaciontheme.ts
var _c0 = ["editModal"];
var _forTrack0 = ($index, $item) => $item._id;
function ThemeComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function ThemeComponent_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openModal());
    });
    \u0275\u0275text(1, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(2, "app-gemini-chat", 22);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("tittle", "Generar una sesi\xF3n detallada sobre " + (((tmp_2_0 = ctx_r2.locationState()) == null ? null : tmp_2_0.title) || "") + ', que incluya ecuaciones y video de youtube con ID: "HKBllam1zhA" y ancho de "100%", adem\xE1s de un apple de geogebra con ID: "cy7eykhk" y ancho de "100%", adem\xE1s citar bibliograf\xEDas referentes al tema, todo en c\xF3digo html sin estilos')("type", "sesi\xF3n");
  }
}
function ThemeComponent_Conditional_10_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function ThemeComponent_Conditional_10_Conditional_1_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.goTest());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r2.isDisabled());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" Ir al test (Inicio: ", ctx_r2.formatTaskDate((tmp_5_0 = ctx_r2.firstStudentTask()) == null ? null : tmp_5_0.dateb), ") (Vence: ", ctx_r2.formatTaskDate((tmp_5_0 = ctx_r2.firstStudentTask()) == null ? null : tmp_5_0.datee), ") (", ctx_r2.getTimeAgo((tmp_5_0 = ctx_r2.firstStudentTask()) == null ? null : tmp_5_0.datee), ") ");
  }
}
function ThemeComponent_Conditional_10_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " '' ");
  }
}
function ThemeComponent_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275conditionalCreate(1, ThemeComponent_Conditional_10_Conditional_1_Conditional_1_Template, 2, 4, "button", 24)(2, ThemeComponent_Conditional_10_Conditional_1_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.hasAvailableTasks() && ctx_r2.isStudentTestActive() ? 1 : 2);
  }
}
function ThemeComponent_Conditional_10_Conditional_2_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function ThemeComponent_Conditional_10_Conditional_2_Conditional_1_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.getRandomIntInclusive());
    });
    \u0275\u0275text(1, " Generar test (Acumular cr\xE9dito) ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r2.isDisabled());
  }
}
function ThemeComponent_Conditional_10_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ThemeComponent_Conditional_10_Conditional_2_Conditional_1_Conditional_0_Template, 2, 1, "button", 27);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r2.hasAvailableTasks() ? 0 : -1);
  }
}
function ThemeComponent_Conditional_10_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, " Intervalo de sesi\xF3n culminada (No gener\xF3 test) ");
    \u0275\u0275elementEnd();
  }
}
function ThemeComponent_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, ThemeComponent_Conditional_10_Conditional_2_Conditional_1_Template, 1, 1)(2, ThemeComponent_Conditional_10_Conditional_2_Conditional_2_Template, 2, 0, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isSessionActive() ? 1 : 2);
  }
}
function ThemeComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275conditionalCreate(1, ThemeComponent_Conditional_10_Conditional_1_Template, 3, 1, "div", 23)(2, ThemeComponent_Conditional_10_Conditional_2_Template, 3, 1, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r2.firstStudentTask()) == null ? null : tmp_2_0.dateb) ? 1 : 2);
  }
}
function ThemeComponent_Conditional_11_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "div", 33)(4, "a", 34);
    \u0275\u0275text(5, " Actualizar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 35);
    \u0275\u0275listener("click", function ThemeComponent_Conditional_11_For_4_Template_button_click_6_listener() {
      const notew_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cleantaskone(notew_r8._id));
    });
    \u0275\u0275text(7, " Borrar ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const notew_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background-color", ctx_r2.isSessionActive() ? "orange" : "skyblue");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" [", (notew_r8.task == null ? null : notew_r8.task.length) || 0, "-", (notew_r8.solution == null ? null : notew_r8.solution.length) || 0, "] ");
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", "/updatetest/" + notew_r8._id);
  }
}
function ThemeComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function ThemeComponent_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.createTask());
    });
    \u0275\u0275text(1, " Crear tarea ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 30);
    \u0275\u0275repeaterCreate(3, ThemeComponent_Conditional_11_For_4_Template, 8, 5, "div", 31, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.tassks());
  }
}
function ThemeComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275element(1, "app-gemini-chat", 22);
    \u0275\u0275elementStart(2, "div", 37);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 38)(5, "div", 39);
    \u0275\u0275text(6);
    \u0275\u0275element(7, "br");
    \u0275\u0275elementStart(8, "input", 40);
    \u0275\u0275listener("ngModelChange", function ThemeComponent_Conditional_28_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDatebInputChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 39);
    \u0275\u0275text(10);
    \u0275\u0275element(11, "br");
    \u0275\u0275elementStart(12, "input", 40);
    \u0275\u0275listener("ngModelChange", function ThemeComponent_Conditional_28_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDateeInputChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 41);
    \u0275\u0275text(14, " Tiempo de examen ");
    \u0275\u0275element(15, "br");
    \u0275\u0275elementStart(16, "input", 42);
    \u0275\u0275listener("ngModelChange", function ThemeComponent_Conditional_28_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.timetest.set($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "button", 43);
    \u0275\u0275listener("click", function ThemeComponent_Conditional_28_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.submitTest());
    });
    \u0275\u0275text(18, " Actualizar campos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 44);
    \u0275\u0275listener("click", function ThemeComponent_Conditional_28_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSubmitRemove());
    });
    \u0275\u0275text(20, " Remover sesi\xF3n ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background-color", ctx_r2.isSessionActive() ? "Gold" : "WhiteSmoke");
    \u0275\u0275advance();
    \u0275\u0275property("tittle", ctx_r2.iaPrompt())("type", "items");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSessionActive() ? "FECHA ACTIVADA" : "FECHA NO ACTIVADA", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Inicia ", ctx_r2.getTimeAgo(ctx_r2.dateb()), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.formattedDateb());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Culmina ", ctx_r2.getTimeAgo(ctx_r2.datee()), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.formattedDatee());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.timetest());
  }
}
function ThemeComponent_Conditional_29_For_3_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const studentTask_r13 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getTimeAgo(studentTask_r13.datee), " ");
  }
}
function ThemeComponent_Conditional_29_For_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, ThemeComponent_Conditional_29_For_3_Conditional_6_Conditional_0_Template, 1, 1);
    \u0275\u0275element(1, "app-export-to-excel", 49);
    \u0275\u0275elementStart(2, "button", 50);
    \u0275\u0275listener("click", function ThemeComponent_Conditional_29_For_3_Conditional_6_Template_button_click_2_listener() {
      const studentTask_r13 = \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cleantaskone(studentTask_r13._id));
    });
    \u0275\u0275text(3, " Borrar tarea ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const note_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx.datee ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("idtheme", ctx_r2.curseId())("codetheme", ctx_r2.themeId())("usser", (note_r11.usser == null ? null : note_r11.usser[0] == null ? null : note_r11.usser[0]._id) || "");
  }
}
function ThemeComponent_Conditional_29_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47)(2, "button", 48);
    \u0275\u0275listener("click", function ThemeComponent_Conditional_29_For_3_Template_button_click_2_listener() {
      const note_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeaddedcurse(note_r11._id));
    });
    \u0275\u0275text(3, " Remover del curso ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275element(5, "br");
    \u0275\u0275conditionalCreate(6, ThemeComponent_Conditional_29_For_3_Conditional_6_Template, 4, 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_13_0;
    const note_r11 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (note_r11.usser == null ? null : note_r11.usser[0] == null ? null : note_r11.usser[0].name) || "", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_13_0 = note_r11.usser == null ? null : note_r11.usser[0] == null ? null : note_r11.usser[0].tassk == null ? null : note_r11.usser[0].tassk[0]) ? 6 : -1, tmp_13_0);
  }
}
function ThemeComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 45);
    \u0275\u0275repeaterCreate(2, ThemeComponent_Conditional_29_For_3_Template, 7, 2, "div", 46, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.stdaverages());
  }
}
var ThemeComponent = class _ThemeComponent {
  currentUser = signal(this.getUserFromStorage(), ...ngDevMode ? [{ debugName: "currentUser" }] : []);
  route = inject(ActivatedRoute);
  router = inject(Router);
  http = inject(HttpClient);
  toast = inject(ToastrService);
  destroyRef = inject(DestroyRef);
  editModal = viewChild("editModal", ...ngDevMode ? [{ debugName: "editModal" }] : []);
  API_URL = `${environment.apiURL}/api`;
  curseId = signal("", ...ngDevMode ? [{ debugName: "curseId" }] : []);
  themeId = signal("", ...ngDevMode ? [{ debugName: "themeId" }] : []);
  locationState = signal({}, ...ngDevMode ? [{ debugName: "locationState" }] : []);
  stdaverages = signal([], ...ngDevMode ? [{ debugName: "stdaverages" }] : []);
  description = signal("", ...ngDevMode ? [{ debugName: "description" }] : []);
  timetest = signal("3", ...ngDevMode ? [{ debugName: "timetest" }] : []);
  isDisabled = signal(false, ...ngDevMode ? [{ debugName: "isDisabled" }] : []);
  tassks = signal([], ...ngDevMode ? [{ debugName: "tassks" }] : []);
  tasskstd = signal([], ...ngDevMode ? [{ debugName: "tasskstd" }] : []);
  id = signal("", ...ngDevMode ? [{ debugName: "id" }] : []);
  title = signal("", ...ngDevMode ? [{ debugName: "title" }] : []);
  dateb = signal(/* @__PURE__ */ new Date(), ...ngDevMode ? [{ debugName: "dateb" }] : []);
  datee = signal(/* @__PURE__ */ new Date(), ...ngDevMode ? [{ debugName: "datee" }] : []);
  noww = signal(/* @__PURE__ */ new Date(), ...ngDevMode ? [{ debugName: "noww" }] : []);
  task = signal("task", ...ngDevMode ? [{ debugName: "task" }] : []);
  solution = signal("solution", ...ngDevMode ? [{ debugName: "solution" }] : []);
  items = signal([
    {
      prg: "\xBFQu\xE9 axioma de orden establece que para cualesquiera dos n\xFAmeros reales $a$ y $b$, se cumple exactamente una de las relaciones: $a < b$, $a = b$ o $a > b$?",
      alt: [
        ["La ley de tricotom\xEDa"],
        ["La propiedad transitiva"],
        ["La propiedad reflexiva"],
        ["La propiedad de simetr\xEDa"]
      ],
      rpta: "La ley de tricotom\xEDa",
      std: ""
    },
    {
      prg: "Hallar la integral de \\(\\int_1^3z^3dz\\) ",
      obs: "Para hallar el valor de la integral propuesta, aplicamos el Teorema Fundamental del C\xE1lculo...",
      std: "Para hallar el valor de la integral propuesta, aplicamos el Teorema Fundamental del C\xE1lculo...",
      pctgsimilar: "97.47126436781609"
    }
  ], ...ngDevMode ? [{ debugName: "items" }] : []);
  firstStudentTask = computed(() => {
    const list = this.tasskstd();
    return list.length > 0 ? list[0] : null;
  }, ...ngDevMode ? [{ debugName: "firstStudentTask" }] : []);
  hasAvailableTasks = computed(() => this.tassks().length > 0, ...ngDevMode ? [{ debugName: "hasAvailableTasks" }] : []);
  iaPrompt = computed(() => `Generar 12 preguntas 6 cerradas y 6 abiertas sobre ${this.locationState()?.title || ""}, que tenga la siguiente estructura...`, ...ngDevMode ? [{ debugName: "iaPrompt" }] : []);
  isSessionActive = computed(() => {
    const start = this.dateb().getTime();
    const end = this.datee().getTime();
    const current = this.noww().getTime();
    return start <= current && current <= end;
  }, ...ngDevMode ? [{ debugName: "isSessionActive" }] : []);
  isStudentTestActive = computed(() => {
    const task = this.firstStudentTask();
    if (!task?.datee)
      return false;
    const expiryDate = parseISO(task.datee);
    if (!isValid(expiryDate))
      return false;
    return expiryDate.getTime() >= this.noww().getTime();
  }, ...ngDevMode ? [{ debugName: "isStudentTestActive" }] : []);
  formattedDateb = computed(() => format(this.dateb(), "yyyy-MM-dd'T'HH:mm"), ...ngDevMode ? [{ debugName: "formattedDateb" }] : []);
  formattedDatee = computed(() => format(this.datee(), "yyyy-MM-dd'T'HH:mm"), ...ngDevMode ? [{ debugName: "formattedDatee" }] : []);
  ngOnInit() {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((p) => {
      this.curseId.set(p["idcurso"] || "");
      this.themeId.set(p["idtema"] || "");
      this.locationState.set(history.state || {});
      this.getNotes();
    });
  }
  getUserFromStorage() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  isAsignature() {
    const asig = localStorage.getItem("asignature");
    return asig ? JSON.parse(asig) : null;
  }
  getTimeAgo(date) {
    if (!date)
      return "";
    try {
      const dateObj = typeof date === "string" ? parseISO(date) : date;
      if (!isValid(dateObj))
        return "";
      return formatDistanceToNow(dateObj, { addSuffix: true, locale: es });
    } catch {
      return "";
    }
  }
  formatTaskDate(dateStr, pattern = "yyyy-MM-dd HH:mm") {
    if (!dateStr)
      return "";
    try {
      const parsed = parseISO(dateStr);
      if (!isValid(parsed))
        return "";
      return format(parsed, pattern, { locale: es });
    } catch {
      return "";
    }
  }
  openModal() {
    this.editModal()?.nativeElement.showModal();
  }
  closeModal() {
    this.editModal()?.nativeElement.close();
  }
  onDatebInputChange(value) {
    if (value) {
      this.noww.set(/* @__PURE__ */ new Date());
      this.dateb.set(new Date(value));
    }
  }
  onDateeInputChange(value) {
    if (value) {
      this.noww.set(/* @__PURE__ */ new Date());
      this.datee.set(new Date(value));
    }
  }
  async getNotes() {
    try {
      const user = this.currentUser();
      const res = await firstValueFrom(this.http.get(`${this.API_URL}/seccions/${this.curseId()}/${this.themeId()}/${user?._id}`));
      if (!res || res.length === 0) {
        this.router.navigate([`/curso/${this.curseId()}`]);
      } else {
        const data = res[0];
        this.id.set(data._id);
        this.tassks.set(data.tassks || []);
        this.timetest.set(data.timetest || "3");
        this.tasskstd.set(data.tasskstd || []);
        this.dateb.set(data.dateb ? parseISO(data.dateb) : /* @__PURE__ */ new Date());
        this.datee.set(data.datee ? parseISO(data.datee) : /* @__PURE__ */ new Date());
        this.title.set(data.title || "");
        this.description.set(data.description || "");
        this.isDisabled.set(false);
        document.title = this.isAsignature()?.title || "Tema";
        if (user?.rol === "1") {
          this.getStdNativescalification(data._id);
        }
      }
    } catch (err) {
      console.error(err);
      this.toast.error(`Error al obtener informaci\xF3n: ${err?.statusText || ""}`);
    }
  }
  async getStdNativescalification(seccionId) {
    const currentId = seccionId || this.id();
    if (!currentId)
      return;
    try {
      const res = await firstValueFrom(this.http.get(`${this.API_URL}/users/themeusers/${currentId}/${this.curseId()}`));
      this.stdaverages.set(res || []);
    } catch (err) {
      console.error(err);
    }
  }
  async submitTest() {
    const payload = {
      title: this.locationState()?.title || "Sin T\xEDtulo",
      description: this.description(),
      dateb: this.dateb().toISOString(),
      datee: this.datee().toISOString(),
      timetest: this.timetest()
    };
    try {
      const res = await firstValueFrom(this.http.put(`${this.API_URL}/seccions/${this.id()}`, payload));
      this.closeModal();
      this.getNotes();
      this.toast.info(res);
    } catch (err) {
      console.error(err);
    }
  }
  async createTask() {
    try {
      await firstValueFrom(this.http.post(`${this.API_URL}/tasks`, {
        note: "",
        task: this.task(),
        items: this.items(),
        solution: this.solution(),
        theme: this.id(),
        codetheme: this.themeId(),
        curse: this.curseId(),
        user: this.currentUser()?._id,
        dateb: this.dateb().toISOString(),
        datee: this.datee().toISOString()
      }));
      this.getNotes();
    } catch (err) {
      console.error(err);
    }
  }
  async createTaskstd(quizItems) {
    const addMinutesOrHours = (timeVal) => {
      const val = Number(timeVal);
      if (isNaN(val))
        return (/* @__PURE__ */ new Date()).toISOString();
      const now = /* @__PURE__ */ new Date();
      const additionInMs = val > 2 ? val * 60 * 1e3 : val * 60 * 60 * 1e3;
      return new Date(now.getTime() + additionInMs).toISOString();
    };
    const timestop = addMinutesOrHours(this.timetest());
    try {
      await firstValueFrom(this.http.post(`${this.API_URL}/tasks`, {
        note: "",
        task: this.task(),
        items: quizItems,
        solution: this.solution(),
        theme: this.id(),
        codetheme: this.themeId(),
        curse: this.curseId(),
        user: this.currentUser()?._id,
        dateb: (/* @__PURE__ */ new Date()).toISOString(),
        datee: timestop
      }));
      this.router.navigate([`/tematest/${this.curseId()}/${this.themeId()}`]);
    } catch (err) {
      console.error(err);
    }
  }
  goTest() {
    this.router.navigate([`/tematest/${this.curseId()}/${this.themeId()}`]);
  }
  async getRandomIntInclusive() {
    this.isDisabled.set(true);
    const availableTasks = this.tassks();
    if (availableTasks.length === 0) {
      this.isDisabled.set(false);
      return;
    }
    const rand = Math.floor(Math.random() * availableTasks.length);
    const currentTask = availableTasks[rand];
    if (!currentTask || !currentTask.items) {
      this.isDisabled.set(false);
      return;
    }
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    const shuffleNestedData = (nestedData) => {
      if (Array.isArray(nestedData)) {
        return shuffleArray(nestedData).map((item) => shuffleNestedData(item));
      }
      if (nestedData !== null && typeof nestedData === "object") {
        const updatedObject = __spreadValues({}, nestedData);
        for (const key in updatedObject) {
          if (Array.isArray(updatedObject[key])) {
            updatedObject[key] = shuffleArray(updatedObject[key]).map((item) => shuffleNestedData(item));
          } else if (typeof updatedObject[key] === "object") {
            updatedObject[key] = shuffleNestedData(updatedObject[key]);
          }
        }
        return updatedObject;
      }
      return nestedData;
    };
    const randomizedQuiz = shuffleNestedData(currentTask.items);
    if (this.tasskstd().length === 0) {
      await this.createTaskstd(randomizedQuiz);
    } else {
      this.toast.info("Test ya generado");
      this.isDisabled.set(false);
    }
  }
  async cleantaskone(taskId) {
    if (window.confirm("\xBFDesea eliminar la tarea?")) {
      try {
        await firstValueFrom(this.http.delete(`${this.API_URL}/tasks/${taskId}`));
        this.getNotes();
        this.getStdNativescalification();
      } catch (err) {
        console.error(err);
      }
    }
  }
  async onSubmitRemove() {
    if (window.confirm("\xBFDeseas eliminar este cap\xEDtulo?")) {
      try {
        await firstValueFrom(this.http.delete(`${this.API_URL}/seccions/${this.id()}`));
        this.getNotes();
        this.toast.info("Removido correctamente");
      } catch (err) {
        console.error(err);
      }
    }
  }
  async removeaddedcurse(idmycurse) {
    if (window.confirm("\xBFDeseas eliminar estudiante de este curso?")) {
      try {
        await firstValueFrom(this.http.delete(`${this.API_URL}/curses/generate/${idmycurse}`));
        this.getStdNativescalification();
        this.toast.info("Removido correctamente");
      } catch (err) {
        console.error(err);
      }
    }
  }
  static \u0275fac = function ThemeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ThemeComponent, selectors: [["app-theme"]], viewQuery: function ThemeComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.editModal, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 31, vars: 9, consts: [["editModal", ""], [1, "py-5"], [1, "container"], [1, "text-center"], [1, "ffont", "h3", "text-info"], [1, "ffont", "h1", "text-center", "text-dark"], [1, "my-2"], [1, "border-0", "rounded", "p-4", "shadow-lg", 2, "max-width", "600px", "width", "100%"], [1, "modal-header", "font-weight-bold", "h5", "mb-3", "border-bottom", "pb-2"], [1, "modal-body"], [1, "mb-3"], [1, "form-label"], ["placeholder", "Contenido", "rows", "9", "name", "description", "required", "", 1, "form-control", "scroll", 3, "ngModelChange", "ngModel"], [1, "modal-footer", "d-flex", "justify-content-end", "gap-2", "border-top", "pt-3", "mt-3"], ["type", "button", 1, "btn", "btn-info", "text-white", 3, "click"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "rounded", "bg-light", "p-1"], [3, "appMathRenderer"], [1, "p-1", "rounded", "my-3", 3, "background-color"], [1, "p-1", "text-center"], [1, "py-3"], [1, "btn", "btn-info", "my-1", "text-center", "w-100", 3, "click"], [3, "tittle", "type"], [1, "p-1"], [1, "btn", "btn-warning", "w-100", 3, "disabled"], [1, "btn", "btn-warning", "w-100", 3, "click", "disabled"], [1, "text-center", "alert", "alert-warning"], [1, "btn", "btn-primary", "w-100", 3, "disabled"], [1, "btn", "btn-primary", "w-100", 3, "click", "disabled"], [1, "btn", "btn-primary", "w-100", "mt-1", 3, "click"], [1, "row", "d-flex", "justify-content-center"], [1, "text-center", "col-md-3", "p-1", "m-1"], [1, "rounded"], [1, "p-1", "btn-group", "w-100"], [1, "btn", "w-100", "btn-light", 3, "routerLink"], [1, "btn", "btn-secondary", "w-100", 3, "click"], [1, "p-1", "rounded", "my-3"], [1, "h3", "w-100", "text-center", "ffont", "font-weight-bold"], [1, "row", "p-1", "d-flex", "justify-content-center", "align-items-center"], [1, "col-md-6", "p-1", "text-center"], ["type", "datetime-local", 1, "form-control", "btn", "btn-info", "w-100", "mt-1", "text-white", 3, "ngModelChange", "ngModel"], [1, "col-md-2", "p-1", "text-center"], ["name", "timetest", "type", "number", "step", "1", "min", "0", "max", "100", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-info", "w-100", "my-1", "text-white", 3, "click"], [1, "btn", "btn-danger", "w-100", 3, "click"], [1, "row", "justify-content-center", "align-items-center"], [1, "col-md-4", "p-1", "m-0", "text-center"], [1, "border", "rounded", "p-1"], [1, "form-control", "btn", "btn-info", "mb-1", "text-white", 3, "click"], [3, "idtheme", "codetheme", "usser"], [1, "btn", "btn-warning", "w-100", 3, "click"]], template: function ThemeComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "app-navbar")(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275conditionalCreate(3, ThemeComponent_Conditional_3_Template, 3, 2);
      \u0275\u0275elementStart(4, "h5", 3)(5, "span", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "span", 5);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div");
      \u0275\u0275conditionalCreate(10, ThemeComponent_Conditional_10_Template, 3, 1, "div", 6);
      \u0275\u0275conditionalCreate(11, ThemeComponent_Conditional_11_Template, 5, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "dialog", 7, 0)(14, "div", 8);
      \u0275\u0275text(15, "Actualizar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 9)(17, "div", 10)(18, "label", 11);
      \u0275\u0275text(19, "Detalle (Escriba texto en formato Markdown)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "textarea", 12);
      \u0275\u0275listener("ngModelChange", function ThemeComponent_Template_textarea_ngModelChange_20_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.description.set($event));
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "div", 13)(22, "button", 14);
      \u0275\u0275listener("click", function ThemeComponent_Template_button_click_22_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.submitTest());
      });
      \u0275\u0275text(23, " Actualizar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "button", 15);
      \u0275\u0275listener("click", function ThemeComponent_Template_button_click_24_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.closeModal());
      });
      \u0275\u0275text(25, " Cerrar ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 16);
      \u0275\u0275element(27, "div", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(28, ThemeComponent_Conditional_28_Template, 21, 10, "div", 18);
      \u0275\u0275conditionalCreate(29, ThemeComponent_Conditional_29_Template, 4, 0, "div", 19);
      \u0275\u0275element(30, "div", 20);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_8_0;
      let tmp_9_0;
      \u0275\u0275advance(3);
      \u0275\u0275conditional(((tmp_1_0 = ctx.currentUser()) == null ? null : tmp_1_0.rol) === "1" ? 3 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate((tmp_2_0 = ctx.locationState()) == null ? null : tmp_2_0.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" [", (tmp_3_0 = ctx.locationState()) == null ? null : tmp_3_0.unittitle, "] ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_4_0 = ctx.currentUser()) == null ? null : tmp_4_0.rol) !== "1" ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_5_0 = ctx.currentUser()) == null ? null : tmp_5_0.rol) === "1" ? 11 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275property("ngModel", ctx.description());
      \u0275\u0275advance(7);
      \u0275\u0275property("appMathRenderer", ctx.description());
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_8_0 = ctx.currentUser()) == null ? null : tmp_8_0.rol) === "1" ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_9_0 = ctx.currentUser()) == null ? null : tmp_9_0.rol) === "1" ? 29 : -1);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    RequiredValidator,
    MinValidator,
    MaxValidator,
    NgModel,
    RouterLink,
    MarkdownModule,
    MathRendererDirective,
    Navbar,
    GeminiChatComponent,
    ExportToExcelComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeComponent, [{
    type: Component,
    args: [{
      selector: "app-theme",
      standalone: true,
      imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        MarkdownModule,
        MathRendererDirective,
        Navbar,
        GeminiChatComponent,
        ExportToExcelComponent
      ],
      template: `
    <app-navbar />
    <div class="py-5"></div>

    <div class="container">
      @if (currentUser()?.rol === '1') {
        <button class="btn btn-info my-1 text-center w-100" (click)="openModal()">
          Editar
        </button>
        <app-gemini-chat
          [tittle]="'Generar una sesi\xF3n detallada sobre ' + (locationState()?.title || '') + ', que incluya ecuaciones y video de youtube con ID: &quot;HKBllam1zhA&quot; y ancho de &quot;100%&quot;, adem\xE1s de un apple de geogebra con ID: &quot;cy7eykhk&quot; y ancho de &quot;100%&quot;, adem\xE1s citar bibliograf\xEDas referentes al tema, todo en c\xF3digo html sin estilos'"
          [type]="'sesi\xF3n'"
        />
      }

      <h5 class="text-center">
        <span class="ffont h3 text-info">{{ locationState()?.title }}</span>
        <span class="ffont h1 text-center text-dark"> [{{ locationState()?.unittitle }}] </span>
      </h5>

      <div>
        @if (currentUser()?.rol !== '1') {
          <div class="my-2">
            @if (firstStudentTask()?.dateb) {
              <div class="p-1">
                @if (hasAvailableTasks() && isStudentTestActive()) {
                  <button
                    class="btn btn-warning w-100"
                    [disabled]="isDisabled()"
                    (click)="goTest()"
                  >
                    Ir al test 
                    (Inicio: {{ formatTaskDate(firstStudentTask()?.dateb) }}) 
                    (Vence: {{ formatTaskDate(firstStudentTask()?.datee) }})
                    ({{ getTimeAgo(firstStudentTask()?.datee) }}) 
                  </button>
                } @else {
               ''   <!-- <div class="text-center alert alert-warning">---</div> -->
                }
              </div>
            } @else {
              <div>
                @if (isSessionActive()) {
                  @if (hasAvailableTasks()) {
                    <button
                      class="btn btn-primary w-100"
                      [disabled]="isDisabled()"
                      (click)="getRandomIntInclusive()"
                    >
                      Generar test (Acumular cr\xE9dito)
                    </button>
                  }
                } @else {
                  <div class="text-center alert alert-warning">
                    Intervalo de sesi\xF3n culminada (No gener\xF3 test)
                  </div>
                }
              </div>
            }
          </div>
        }

        @if (currentUser()?.rol === '1') {
          <button class="btn btn-primary w-100 mt-1" (click)="createTask()">
            Crear tarea
          </button>

          <div class="row d-flex justify-content-center">
            @for (notew of tassks(); track notew._id) {
              <div class="text-center col-md-3 p-1 m-1">
                <div
                  class="rounded"
                  [style.background-color]="isSessionActive() ? 'orange' : 'skyblue'"
                >
                  [{{ notew.task?.length || 0 }}-{{ notew.solution?.length || 0 }}]
                  <div class="p-1 btn-group w-100">
                    <a
                      class="btn w-100 btn-light"
                      [routerLink]="'/updatetest/' + notew._id"
                    >
                      Actualizar
                    </a>
                    <button
                      class="btn btn-secondary w-100"
                      (click)="cleantaskone(notew._id)"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>

      <dialog #editModal class="border-0 rounded p-4 shadow-lg" style="max-width: 600px; width: 100%;">
        <div class="modal-header font-weight-bold h5 mb-3 border-bottom pb-2">Actualizar</div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Detalle (Escriba texto en formato Markdown)</label>
            <textarea
              class="form-control scroll"
              placeholder="Contenido"
              rows="9"
              name="description"
              [ngModel]="description()"
              (ngModelChange)="description.set($event)"
              required
            ></textarea>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-end gap-2 border-top pt-3 mt-3">
          <button type="button" class="btn btn-info text-white" (click)="submitTest()">
            Actualizar
          </button>
          <button type="button" class="btn btn-secondary" (click)="closeModal()">
            Cerrar
          </button>
        </div>
      </dialog>

      <!-- VISUALIZACI\xD3N DE MARKDOWN -->
      <div class="rounded bg-light p-1">
        <div [appMathRenderer]="description()"></div>
      </div>

      <!-- PANEL DOCENTE (ROL 1) DE CONFIGURACI\xD3N -->
      @if (currentUser()?.rol === '1') {
        <div
          class="p-1 rounded my-3"
          [style.background-color]="isSessionActive() ? 'Gold' : 'WhiteSmoke'"
        >
          <app-gemini-chat
            [tittle]="iaPrompt()"
            [type]="'items'"
          />

          <div class="h3 w-100 text-center ffont font-weight-bold">
            {{ isSessionActive() ? 'FECHA ACTIVADA' : 'FECHA NO ACTIVADA' }}
          </div>

          <div class="row p-1 d-flex justify-content-center align-items-center">
            <!-- FECHA INICIO -->
            <div class="col-md-6 p-1 text-center">
              Inicia {{ getTimeAgo(dateb()) }}
              <br />
              <input
                type="datetime-local"
                class="form-control btn btn-info w-100 mt-1 text-white"
                [ngModel]="formattedDateb()"
                (ngModelChange)="onDatebInputChange($event)"
              />
            </div>

            <!-- FECHA FIN -->
            <div class="col-md-6 p-1 text-center">
              Culmina {{ getTimeAgo(datee()) }}
              <br />
              <input
                type="datetime-local"
                class="form-control btn btn-info w-100 mt-1 text-white"
                [ngModel]="formattedDatee()"
                (ngModelChange)="onDateeInputChange($event)"
              />
            </div>

            <!-- TIEMPO DE EXAMEN -->
            <div class="col-md-2 p-1 text-center">
              Tiempo de examen
              <br />
              <input
                class="form-control"
                name="timetest"
                type="number"
                [ngModel]="timetest()"
                (ngModelChange)="timetest.set($event)"
                step="1"
                min="0"
                max="100"
              />
            </div>
          </div>

          <button class="btn btn-info w-100 my-1 text-white" (click)="submitTest()">
            Actualizar campos
          </button>
          <button class="btn btn-danger w-100" (click)="onSubmitRemove()">
            Remover sesi\xF3n
          </button>
        </div>
      }

      <!-- PANEL DE ESTUDIANTES PARA ROL 1 -->
      @if (currentUser()?.rol === '1') {
        <div class="p-1 text-center">
          <div class="row justify-content-center align-items-center">
            @for (note of stdaverages(); track note._id) {
              <div class="col-md-4 p-1 m-0 text-center">
                <div class="border rounded p-1">
                  <button
                    class="form-control btn btn-info mb-1 text-white"
                    (click)="removeaddedcurse(note._id)"
                  >
                    Remover del curso
                  </button>

                  {{ note.usser?.[0]?.name || '' }}
                  <br />

                  @if (note.usser?.[0]?.tassk?.[0]; as studentTask) {
                    @if (studentTask.datee) {
                      {{ getTimeAgo(studentTask.datee) }}
                    }
                    <!-- {{ studentTask._id }} -->
                    <app-export-to-excel
                      [idtheme]="curseId()"
                      [codetheme]="themeId()"
                      [usser]="note.usser?.[0]?._id || ''"
                    />
                    <button
                      class="btn btn-warning w-100"
                      (click)="cleantaskone(studentTask._id)"
                    >
                      Borrar tarea
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      }

      <div class="py-3"></div>
    </div>
  `
    }]
  }], null, { editModal: [{ type: ViewChild, args: ["editModal", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ThemeComponent, { className: "ThemeComponent", filePath: "src/app/componentes/actualizaciontheme.ts", lineNumber: 319 });
})();
export {
  ThemeComponent
};
//# sourceMappingURL=chunk-ASV6LQ3E.js.map
