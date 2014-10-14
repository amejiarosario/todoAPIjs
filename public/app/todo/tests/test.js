describe("First Test", function() {
  // Arrange (set up a scenario)
  var counter;
  beforeEach(function() {
    counter = 0;
  });
  it("increments value", function() {
    // Act (attempt the operation)
    counter++;
    // Assert (verify the result)
    expect(counter).toEqual(1);
  })
  it("decrements value", function() {
    // Act (attempt the operation)
    counter--;
    // Assert (verify the result)
    expect(counter).toEqual(0);
  })
});
