(function (window, undefined) {

  /** 
   * This object stores a key requirement. We only need it because
   * this way we can check the instanceOf the requirement and handle
   * it appropriately.
   */

  var SaDOS_Key = function (code) {
    this.code = code;
  };

  /**
   * This is her, SaDOS.
   */

  var SaDOS = function (steps, print_callback) {
    var self  = this,
        step  = 0;

    /**
     * This happens whenever a requirement is met, i.e. she can move
     * on to the next step. If there is no next step, she does
     * nothing.
     */

    this.step = function () {
      if (typeof steps[step + 1] !== "undefined") {
        step += 1;
        self.print(steps[step].msg);
      }
    };

    /**
     * This is invoked whenever SaDOS has anything to say. It calls
     * the provided callback.
     */

    this.print = function (text) {
      print_callback.apply(null, [text]);
    };

    /**
     * This starts the baby up.
     */

    this.start = function () {
      self.print(steps[step].msg);
    };

    /**
     * This is invoked through e.g. an event listener on the input
     * element and provided with user input data. What key they
     * pressed and what the value of the user input was.
     *
     * It checks if the requirements for the current step are met, and
     * and if that is so, moves on.
     */

    this.check = function (code, val) {
      var req = steps[step].req;

      if (val.length > 0) {
        self.print('$ ' + val);
      }

      if (req instanceof SaDOS_Key) {
        if (code === req.code) {
          self.step();
        }
      } else if (req instanceof RegExp) {
        if (val.search(req) !== -1) {
          self.step();
        }
      } else {
        if (req === val) {
          self.step();
        }
      }
    };
  };

  /**
   * Fuck yeah export
   */
   
  window.SaDOS     = SaDOS;
  window.SaDOS_Key = SaDOS_Key;
}(window));