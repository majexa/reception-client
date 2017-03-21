//let lastScreen = 'not-defined';

const dummy = (state = {}, action) => {

  switch (action.type) {
    case 'SCREEN_INIT':
      return {
        screen: action.screen,
        nextScreen: false,
        startChange: false,
        //disableHeader: true
      };
    case 'SCREEN_CHANGE':
      if (!action.screen) throw new Error('Screen param not defined in action');
      if (state.screen === action.screen) {
        console.log('Already on screen "' + action.screen + '". Skipped');
        return state;
      }
      let data = {
        nextScreen: action.screen,
        startChange: true,
        direction: action.direction || 'right'
      };
      if (state.screen) data.prevScreen = state.screen;
      if (action.id) data.id = action.id;
      if (action.text) data.text = action.text;
      if (action.subText) data.subText = action.subText;
      return Object.assign({}, state, data);
    case 'SCREEN_RESET':
      console.log('SCREEN_RESET to ' + state.nextScreen);
      let screen;
      if (!state.nextScreen) {
        if (!action.screen) {
          throw new Error('You need to define nextScreen property while resetting screen. Or add "screen" property');
        } else {
          screen = action.screen;
        }
      } else {
        screen = state.nextScreen;
      }
      return Object.assign({}, state, {
        screen: screen,
        nextScreen: false,
        startChange: false
      });
    default:
      return state;
  }

};

export default dummy