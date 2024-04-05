import { BarChart } from '@tremor/react';
import { useSelector } from "react-redux";
import { useUsers } from "../../hooks/useUser"

const Dashboard =()=>{

    useUsers();
    const usuarios = useSelector((state) => state.storage.allUsers);
    const usuariosActivos = usuarios.filter(usuario => usuario.status === true);
    const usuariosBloqueados = usuarios.filter(usuario => usuario.status === false);


     
  const chartdata = [
    {
      name: 'Usuarios',
      Totales: usuarios.length,
    },
    {
      name: 'Usuarios activos',
      Totales: usuariosActivos.length,
    },
    {
      name: 'Usuarios bloqueados',
      Totales: usuariosBloqueados.length,
    }
  ]
  const dataFormatter = (number) =>
  new Intl.NumberFormat('us').format(number).toString();
    return (
        <div>
   <h3 class="text-xl font-bold">
    <i class="flaticon-users inline-block mr-2"></i>
    Usuarios Registrados por Mes
    <small class="text-sm"></small>
</h3>

        <BarChart
        className="mt-6 bg-white"
        data={chartdata}
        index="name" 
        categories={['Totales']} 
        colors={['orange']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
      </div>
    )

}
export default Dashboard