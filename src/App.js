import React, { useState, useEffect } from 'react'
import differenceInMonths from 'date-fns/differenceInMonths'
import differenceInYears from 'date-fns/differenceInYears'
import differenceInDays from 'date-fns/differenceInDays'
const App = () => {
  const [funcionario, setFuncionario] = useState({
    nombre: "",
    apellido: "",
    cedula: 0,
    fechaNac: "",
    sexo: "",
    dir: {
      calle1: "",
      calle2: "",
      nroCasa: 0,
      ciudad: "",
      pais: "",
      ref: ""
    },
    correo: "",
    tel: "",
    honorario: false,
    aDeclarar: 0,
    cargo: "",
    dpto: "",
    fechaIng: "",
    fechaIngIPS: "",
    fechaSal: "",
    cantHijos: 0,
    montoPorHij: 0,
    diasTrab: "",
    vacaciones: 0,
    vacacionesTomadas: 0,
    reposo: Number,
    adelSal: "",
    IPS: 0,
    bonificaciones: 0,
    cuenta: {
      banco: "",
      cuenta: 0,
    },
    salarioBruto: 0,
    comisiones: 0,
    descuento: 0,
    descuentos: [],
    conceptos: [],
    salarioACobrar: 0,
  })
  const cargos = ["Presidente", "Director", "Director Asociado", "Gerente General", "Gerente Comercial", "Ejecutivo Comercial", "Editor General", "Periodista", "Editor", "Director de TV", "Productora", "Jefe de Edicion", "Productor", "Jefe de Edicion", "Productor", "Edicion de TV", "Conductor", "Jefe de Diseño", "Diseñador", "Diseñador MKT", "Brand Manager EI", "Brand Manager 5D", "Jefe de RRSS", "Project Manager", "Programador", "Content Manager", "Analista de Proyectos", "Administracion", "Servicios Generales", "Choferes", "Interior"]
  const bancos = ['Banco Nacional de Fomento',
    'Banco de la Nación Argentina',
    'Banco GNB Paraguay S.A.',
    'Banco Do Brasil S.A.',
    'Citibank N.A.',
    'BBVA S.A.',
    'Sudameris Bank S.A.E.C.A.',
    'Banco Itaú Paraguay S.A.',
    'Banco Continental S.A.E.C.A.',
    'Banco Regional S.A.E.C.A.',
    'Banco BASA S.A.',
    'Visión Banco S.A.E.C.A.',
    'Banco Río S.A.E.C.A.',
    'Banco Familiar S.A.E.C.A.',
    'Banco Atlas S.A.',
    'Bancop S.A.',
    'Interfisa Banco S.A.'
  ]
  bancos.sort()
  cargos.sort()
  const [descuentos, setDescuentos] = useState([])
  const [conceptos, setConceptos] = useState([])
  const changeHandler = async (e) => {
    setFuncionario({ ...funcionario, [e.target.name]: e.target.value })
  }
  const changeHandler2 = (e) => {
    setFuncionario({
      ...funcionario, dir: {
        ...funcionario.dir, [e.target.name]: e.target.value
      }
    })
  }
  const changeHandler3 = (e) => {
    setFuncionario({
      ...funcionario, cuenta: {
        ...funcionario.cuenta, [e.target.name]: e.target.value
      }
    })
  }
  const chkboxHandler = (e) => {
    setFuncionario({
      ...funcionario, honorario: e.target.checked
    });
  }

  const agregarDescuento = (e) => {
    e.preventDefault()
    setDescuentos([...descuentos, 0])
    setConceptos([...conceptos, ""])
  }
  const eliminarDescuento = (e) => {
    e.preventDefault()
    descuentos.pop()
    conceptos.pop()

    setDescuentos(descuentos.filter(descuento => descuento.key !== descuentos.length - 1));
    setConceptos(conceptos.filter(concepto => concepto.key !== concepto.length - 1));
  }
  useEffect(() => {
    let aDeclarar = 0
    funcionario.honorario ? aDeclarar = funcionario.aDeclarar : aDeclarar = 0
    let montoIPS = (funcionario.salarioBruto - aDeclarar) * 0.09
    let salario = Number(funcionario.salarioBruto) + Number(funcionario.bonificaciones) + Number(funcionario.comisiones) - Number(montoIPS) - Number(funcionario.descuento) - Number(funcionario.adelSal) + funcionario.montoPorHij

    setFuncionario(funcionario => ({ ...funcionario, IPS: montoIPS, salarioACobrar: salario }))
  }, [funcionario.salarioBruto, funcionario.aDeclarar, funcionario.bonificaciones, funcionario.comisiones, funcionario.descuento, funcionario.honorario, funcionario.adelSal, funcionario.montoPorHij])
  useEffect(() => {
    let suma = descuentos.reduce((a, b) => Number(a) + Number(b), 0)
    console.log(suma);
    setFuncionario(funcionario => ({ ...funcionario, descuento: suma, descuentos: descuentos, conceptos: conceptos }))

  }, [descuentos, conceptos])
  useEffect(() => {
    let ahora = new Date()
    let ingreso = new Date(funcionario.fechaIng)
    let meses = differenceInMonths(ahora, ingreso)
    let anhos = differenceInYears(ahora, ingreso);
    let vacas = 0
    if (anhos < 5) {
      vacas = 1
    } else if (anhos >= 5 && anhos < 10) {
      vacas = 1.5
    } else {
      vacas = 2.5
    }
    let diasTrabajados = differenceInDays(ahora, ingreso)
    setFuncionario(funcionario => ({ ...funcionario, vacaciones: ((meses % 12) * vacas) + vacas - funcionario.vacacionesTomadas, diasTrab: diasTrabajados }))
  }, [funcionario.fechaIng, funcionario.vacacionesTomadas])
  useEffect(() => {
    let dpto = ""
    switch (funcionario.cargo) {
      case 'Presidente':
      case 'Gerente General':
      case 'Director':
        dpto = "Gerencia"
        break;
      case 'Gerente Comercial':
      case 'Ejecutivo Comercial':
        dpto = "Comercial"
        break;
      case "Director Asociado":
      case "Editor General":
      case "Periodista":
      case "Editor":
        dpto = "Prensa"
        break;
      case "Director de TV":
      case "Productora":
      case "Jefe de Edicion":
      case "Tecnico":
      case "Productor":
      case "Edicion de TV":
      case "Conductor":
        dpto = "TV"
        break;
      case "Diseñador":
      case "Jefe de Diseño":
        dpto = "Diseño"
        break;
      case "Brand Manager EI":
      case "Brand Manager 5D":
      case "Jefe de RRSS":
      case "Content Manager":
      case "Diseñador MKT":
      case "Analista de Proyectos":
        dpto = "Marketing"
        break;
      case "Administracion":
        dpto = "Administracion"
        break;
      case "Servicios Generales":
        dpto = "Servicios Generales"
        break;
      case "Choferes":
        dpto = "Distribucion"
        break;
      case "Interior":
        dpto = "Interior"
        break;
      case "Project Manager":
      case "Programador":
        dpto = "BI"
        break;
      default:
        dpto = ""
    }
    setFuncionario(funcionario => ({ ...funcionario, departamento: dpto }))
  }, [funcionario.cargo])
  useEffect(() => {
    let montoporHijos = funcionario.cantHijos * 2192839 * 0.05
    if (funcionario.salarioBruto > 4385678) {
      montoporHijos = 0
    }
    setFuncionario(funcionario => ({ ...funcionario, montoPorHij: Math.round(montoporHijos) }))
  }, [funcionario.cantHijos, funcionario.salarioBruto])
  const funcionarioForm = (
    <form>
      Nombre:
      <input
        type="text"
        name="nombre"
        value={funcionario.nombre}
        onChange={changeHandler}
      /><br />
      Apellido
      <input
        type="text"
        name="apellido"
        value={funcionario.apellido}
        onChange={changeHandler}
      /><br />
      Cedula:
      <input
        type="number"
        max="9999999"
        min="0"
        name="cedula"
        value={funcionario.cedula}
        onChange={changeHandler}
      /><br />
      Fecha de nacimiento:
      <input
        type="date"
        name="fechaNac"
        value={funcionario.fechaNac}
        onChange={changeHandler}
      /><br />
      Sexo:
      <select name="sexo" value={funcionario.sexo} onChange={changeHandler}>
        <option>Masculino</option>
        <option>Femenino</option>
      </select><br />
      Direccion
      <div>
        Calle 1:
          <input
          type="text"
          name="calle1"
          value={funcionario.dir['calle1']}
          onChange={changeHandler2}
        /><br />
        Calle 2:
          <input
          type="text"
          name="calle2"
          value={funcionario.dir['calle2']}
          onChange={changeHandler2}
        /><br />
        Numero de casa:
          <input
          type="number"
          min="00000"
          name='nroCasa'
          value={funcionario.dir['nroCasa']}
          onChange={changeHandler2}
        /><br />
        Ciudad:
          <input
          type="text"
          name="ciudad"
          value={funcionario.dir['ciudad']}
          onChange={changeHandler2}
        /><br />
        Pais:
          <input
          type="text"
          name="pais"
          value={funcionario.dir['pais']}
          onChange={changeHandler2}
        /><br />
        Referencia:
          <input
          type="text"
          name="ref"
          value={funcionario.dir['ref']}
          onChange={changeHandler2}
        /><br />
      </div>
      Correo:
      <input
        type="email"
        name="correo"
        value={funcionario.correo}
        onChange={changeHandler}
      /><br />
      Telefono:
      <input
        type="number"
        name="tel"
        value={funcionario.tel}
        onChange={changeHandler}
      /><br />
      Cargo:
      <select name="cargo" value={funcionario.cargo} onChange={changeHandler}>
        {cargos.map((cargo, i) => (
          <option key={i}>{cargo}</option>
        )
        )
        }
      </select><br />
      Departamento:
      {funcionario.departamento}
      <br />
      Fecha de ingreso:
      <input
        type="date"
        name="fechaIng"
        value={funcionario.fechaIng}
        onChange={changeHandler}
      /><br />
      Fecha de ingreso a IPS:
      <input
        type="date"
        name="fechaIngIPS"
        value={funcionario.fechaIngIPS}
        onChange={changeHandler}
      /><br />
      Fecha de salida:
      <input
        type="date"
        name="fechaSal"
        value={funcionario.fechaSal}
        onChange={changeHandler}
      /><br />

      { funcionario.salarioBruto < 4385678 ? (
        <div>
          Cant. de Hijos:
          <input
            type="number"
            name="cantHijos"
            value={funcionario.cantHijos}
            onChange={changeHandler}
          /><br />
          Monto por Hijo: {Math.round(2192839 * 0.05)}
          <br />
          Monto total: {funcionario.montoPorHij}
        </div>
      ) : (
          <div></div>
        )
      }
Dias trabajados aproximadamente: {funcionario.diasTrab}<br />
Reposo:
      <input
        type="date"
        name="reposo"
        value={funcionario.reposo}
        onChange={changeHandler}
      /><br />
Adelanto:
      <input
        type="number"
        name="adelSal"
        value={funcionario.adelSal}
        onChange={changeHandler}
      /><br />
Vacaciones tomadas:
      <input
        type="number"
        name="vacacionesTomadas"
        value={funcionario.vacacionesTomadas}
        onChange={changeHandler}
      /><br />
Vacaciones generadas: { funcionario.vacaciones} <br />
Cuenta Bancaria
      < div >
        Nombre del banco:
        <select
          name="banco"
          value={funcionario.cuenta['banco']}
          onChange={changeHandler3}
        >
          {
            bancos.map((banco, i) => (
              <option key={i}>{banco}</option>
            ))
          }
        </select><br />
Numero de cuenta
  < input
          type="number"
          name="cuenta"
          value={funcionario.cuenta['cuenta']}
          onChange={changeHandler3}
        /> <br />
      </div >
  Salario Fijo:
      <input
        type="number"
        name="salarioBruto"
        value={funcionario.salarioBruto}
        onChange={changeHandler}
      /><br />
Honorarios:
      <input type="checkbox" name="honorario" value={funcionario.honorario} onChange={chkboxHandler} /><br />
      {
        funcionario.honorario === true ?
          <div>
            A Declarar:
          <input
              type="number"
              name="aDeclarar"
              value={funcionario.aDeclarar}
              onChange={changeHandler}
            /><br />
          </div>
          :
          <div></div>
      }
IPS:
      { funcionario.IPS} <br />
Comisiones:
      <input
        type="number"
        name="comisiones"
        value={funcionario.comisiones}
        onChange={changeHandler}
      /><br />
Bonificacion:
      <input
        type="number"
        name="bonificaciones"
        value={funcionario.bonificaciones}
        onChange={changeHandler}
      /><br />
Otros descuentos:
      <div>
        <button onClick={agregarDescuento}>Agregar Descuento</button>
      </div>
      <div>
        <button onClick={eliminarDescuento}>Eliminar Descuento</button>
      </div>
      <div name="descuentos">
        <div style={{ display: 'inline' }}>
          {descuentos.map((value, i) => (
            <div >
              <label>Descuento : </label>
              <input
                key={i}
                value={value}
                type="number"
                onChange={(e) =>
                  setDescuentos(
                    descuentos.map((value, j) => {
                      if (i === j) value = e.target.value;
                      return value;
                    })
                  )
                }
              />
            </div>
          ))
          }
        </div>
        <div style={{ display: 'inline' }}>
          {
            conceptos.map((value, i) => (
              <div >
                <label>En concepto de: </label>
                <input
                  key={i}
                  value={value}
                  type="text"
                  onChange={(e) =>
                    setConceptos(
                      conceptos.map((value, j) => {
                        if (i === j) value = e.target.value;
                        return value;
                      })
                    )
                  }
                />
              </div>
            ))
          }
        </div>
      </div >
      <br />
Salario a cobrar: { funcionario.salarioACobrar} Gs.
    </form >
  )
  console.log(funcionario);
  return (
    <div>
      {funcionarioForm}
    </div>
  )
}

export default App;
