const furnitureType = {
  verticalChair: {
    width: 10,
    path: 'M 0 0 L 20 0 L 20 10 L 0 10 L 0 0 Z'
  },
  horizontalChair: {
    width: 10,
    path: 'M 0 0 L 10 0 L 10 20 L 0 20 L 0 0 Z'
  },
  circle4: {
    figureData: {
      path: 'M 60 30 C 60 46.568542494923804 46.568542494923804 60 30 60 C 13.431457505076196 60 2.0290612532945333e-15 46.568542494923804 0 30 C -2.0290612532945333e-15 13.431457505076196 13.4314575050762 3.0435918799417997e-15 30 0 C 46.568542494923804 1.0145306266472666e-15 60 13.4314575050762 60 30 Z',
      width: 80,
      height: 80,
      offsetX: 10,
      offsetY: 10
    },
    chairs: [
      {type: 'verticalChair', offsetX: 20, offsetY: -10},
      {type: 'verticalChair', offsetX: 20, offsetY: 60},
      {type: 'horizontalChair', offsetX: -10, offsetY: 20},
      {type: 'horizontalChair', offsetX: 60, offsetY: 20}
    ],
  },
  circle2: {
    figureData: {
      path: 'M 60 30 C 60 46.568542494923804 46.568542494923804 60 30 60 C 13.431457505076196 60 2.0290612532945333e-15 46.568542494923804 0 30 C -2.0290612532945333e-15 13.431457505076196 13.4314575050762 3.0435918799417997e-15 30 0 C 46.568542494923804 1.0145306266472666e-15 60 13.4314575050762 60 30 Z',
      width: 80,
      height: 80,
      offsetX: 0,
      offsetY: 10
    },
    chairs: [
      {type: 'verticalChair', offsetX: 20, offsetY: -10},
      {type: 'verticalChair', offsetX: 20, offsetY: 60},
    ],
  },
  rect4: {
    figureData: {
      path: 'M 0 0 L 80 0 L 80 40 L 0 40 L 0 0 Z',
      width: 70,
      height: 70,
      offsetX: 0,
      offsetY: 10
    },
    chairs: [
      {type: 'verticalChair', offsetX: 15, offsetY: -10},
      {type: 'verticalChair', offsetX: 45, offsetY: -10},
      {type: 'verticalChair', offsetX: 15, offsetY: 40},
      {type: 'verticalChair', offsetX: 45, offsetY: 40},
    ],
  },
  rect2: {
    figureData: {
      path: 'M 0 0 L 40 0 L 40 40 L 0 40 L 0 0 Z',
      width: 70,
      height: 70,
      offsetX: 0,
      offsetY: 10
    },
    chairs: [
      {type: 'verticalChair', offsetX: 10, offsetY: -10},
      {type: 'verticalChair', offsetX: 10, offsetY: 40},
    ],
  }
};

export {furnitureType};