const MainPanel = {
  baseStyle: {
    float: 'right',
    maxWidth: '100%',
    overflow: 'auto',
    position: 'relative',
    maxHeight: '100%',
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    transitionDuration: '.2s, .2s, .35s',
    transitionProperty: 'top, bottom, width',
    transitionTimingFunction: 'linear, linear, ease',
    height: '100%',
  },
  variants: {
    main: () => ({
      float: 'right',
    }),
    rtl: () => ({
      float: 'left',
    }),
  },
  defaultProps: {
    variant: 'main',
  },
};

const MainPanelComponent = {
  components: {
    MainPanel,
  },
};

export default MainPanelComponent;
