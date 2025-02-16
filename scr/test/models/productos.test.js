const {obtieneCategorias,obtieneProductosTodos,obtieneProductoId,agregaProducto,modificaProducto} = require('../../models/productos')
const {DB} = require('../../config/db')

jest.mock('../../config/db')

describe('MODELS PRODUCTOS TEST', () => {
  test('obtieneCategorias - Retorna las categorias', async() => {
    categorias = [
        {
            "id": 1,
            "nombre": "Familiares"
        },
        {
            "id": 2,
            "nombre": "Individuales"
        },
        {
            "id": 3,
            "nombre": "Postres"
        }
    ]
    
    DB.query.mockResolvedValue({rows:categorias})

    const resut = await obtieneCategorias()

    expect(resut).toBe(categorias)
    expect(DB.query).toHaveBeenCalledTimes(1)
  })

  test ('obtieneProductosTodos - Retorna todos los productos', async() => {
    productos = [
      {
          "id": 1,
          "categoria_id": 1,
          "titulo": "Beef bourguignon",
          "subtitulo": "Con champiñones y tocino, 4 porciones",
          "precio": 18990,
          "imagen": "https://corpora-fork.s3.amazonaws.com/back_img/PTPP01279-beef-bourguignon-fam-frontal-830-1732567123448.jpg",
          "sku": "FAM001"
      },
      {
          "id": 2,
          "categoria_id": 1,
          "titulo": "Arroz Árabe",
          "subtitulo": "Con almendras tostadas, 4 porciones",
          "precio": 6490,
          "imagen": "https://corpora-fork.s3.amazonaws.com/back_img/PTPP01252-arroz-arabe-familiar-frontal-1702299574034.jpg",
          "sku": "FAM002"
      }
    ]

    DB.query.mockResolvedValue({rows:productos})

    const resut = await obtieneCategorias()

    expect(resut).toBe(productos)
    expect(DB.query).toHaveBeenCalledTimes(2)
  })
})