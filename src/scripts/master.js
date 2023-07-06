// Import your script files
import $ from "jquery";

// Import your styles
import "../styles/master.less";

// import js
import countdown from "./countdown";
import './bezierCanvas.js';


// Your script goes here
const main = () => {
  $.fn.countdownTimer = function (options) {
    // This is the easiest way to have default options.
    const settings = $.extend(
      {
        endTime: new Date(),
      },
      options
    );

    const $this = $(this);

    const $seconds = $this.find(".time.seconds");
    const $minutes = $this.find(".time.minutes");
    const $hours = $this.find(".time.hours");
    const $days = $this.find(".time.days");

    let seconds = 0;
    let minutes = 0;
    let days = 0;
    let hours = 0;

    const switchCountdownValue = function ($obj, val) {
      // Add leading zero
      let s = val + "";
      while (s.length < 2) s = "0" + s;

      // Remove previous value
      $obj.find(".value").remove();
      // Add next value
      const next = $("<div class='value'>" + s + "</div>");
      $obj.prepend(next);
    };

    const timerId = countdown(
      settings.endTime,
      function (ts) {
        if (seconds != ts.seconds) {
          switchCountdownValue($seconds, ts.seconds);
          seconds = ts.seconds;
        }
        if (minutes != ts.minutes) {
          switchCountdownValue($minutes, ts.minutes);
          minutes = ts.minutes;
        }
        if (hours != ts.hours) {
          switchCountdownValue($hours, ts.hours);
          hours = ts.hours;
        }

        if (days != ts.days) {
          switchCountdownValue($days, ts.days);
          days = ts.days;
        }
      },
      countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS
    );

    return this;
  };

  $(function () {
    // Activate countdownTimer plugin on a '.countdown' element
    $(".countdown").countdownTimer({
      // Set the end date for the countdown
      endTime: new Date("September 21, 2023 11:13:00 UTC+0200"),
    });

    // Activate bezierCanvas plugin on a #bg-canvas element
    $("#bg-canvas").bezierCanvas({
      maxStyles: 10,
      maxLines: 100,
      lineSpacing: 1,
      colorBase: { r: 100, g: 100, b: 100 },
      colorVariation: { r: 150, g: 120, b: 150 },
      delayVariation: 0.5,
      globalAlpha: 0.5,
      globalSpeed: 500,
    });

    // Add handler on 'Scroll down to learn more' link
    $(function () {
      $(".overlap .more").click(function (e) {
        e.preventDefault();
        $("body,html").animate({ scrollTop: $(window).height() });
      });
    });
  });

  return "Hello, world!";
};

console.log(main());
