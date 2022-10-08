import { DashboardOutlined } from '@mui/icons-material';
import { AdminLayout } from '../../components/layouts';

const DashboardPage = () => {
	return (
		<AdminLayout 
            title='Dashboaard' 
            subTitle='Estadísticas Generales'
            icon={ <DashboardOutlined /> }
        >
            <h3>Hola mundo</h3>
		</AdminLayout>
	);
};

export default DashboardPage;
