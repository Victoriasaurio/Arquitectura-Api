const { UserRepository } = require("../../../src/repositories")
const mockingoose = require("mockingoose").default // Se accede como objeto a esta dependencia.
const { User } = require("../../../src/models")
let { UserModelMock: { user, users } } = require("../../mocks")

describe("User repository test", () => {
  beforeEach(() => { // Lógica que se ejecuta antes.
    mockingoose.resetAll(); // Resetea todos los mokings que hay
    jest.clearAllMocks(); //
  })

  // Test que devuelva al usuario por un ID.
  it("Should return a user by id", async () => {
    const _user = {...user} // Fotocopia del user
    delete _user.password
    mockingoose(User).toReturn(user, "findOne") // Devuelve el user cuando se utiliza el método findOne.

    const _userRepository = new UserRepository({ User })
    const expected = await _userRepository.getOne(_user._id) // La respuesta que se espera.

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user) // Verifica que la respuesta sea exactamente igual a _user.
  })

  it("Should find a user by username", async () => {
    const _user = {...user}
    delete _user.password
    mockingoose(User).toReturn(user, "findOne")

    const _userRepository = new UserRepository({ User })
    const expected = await _userRepository.getUserByUsername(_user._id)

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user)
  })

  it("Should return a user collection", async () => {
    users = users.map(user => {
      delete user.password
      return user
    })

    mockingoose(User).toReturn(users, "find")

    const _userRepository = new UserRepository({ User })
    const expected = await _userRepository.getAll()

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(users)
  })

  it("Should update an especific user by id", async () => {
    const _user = {...user}
    delete _user.password
    mockingoose(User).toReturn(_user, "findOneAndUpdate")

    const _userRepository = new UserRepository({ User })
    const expected = await _userRepository.update(user._id, {
      name: "Victoria"
    })

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user)
  })

  it("Should delete an especific user by id", async () => {
    mockingoose(User).toReturn(user, "findOneAndDelete")

    const _userRepository = new UserRepository({ User })
    const expected = await _userRepository.delete(user._id, {
      name: "Victoria"
    })

    expect(JSON.parse(JSON.stringify(expected))).toEqual(true)
  })

})
