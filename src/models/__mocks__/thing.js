module.exports = {
    Thing: jest.fn(() => {
        return {
            model : jest.fn(),
            save: jest.fn(),
          
        }
    }),
  };
  