import { SimpleGrid, Box, Flex, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

//Carrega conteúdo de maneira dinamica
/* ssr: false (server side rendering) fará com que essa importação só ocorra no browser, 
*  nunca na cama de servidor do next 
*/
const Chart = dynamic(() => import('react-apexcharts'), {
	ssr: false
})

const options = {
	chart: {
		toolbar: {
			show: false
		},
		zoom: {
			enable: false
		},
		foreColor: theme.colors.gray[500]
	},
	grid: {
		show: false
	},
	dataLabels: {
		enabled: false
	},
	tooltip: {
		enabled: false,
	},
	xaxis: {
		type: 'datetime',
		axisBorder: {
			color: theme.colors.gray[600]
		},
		axisTicks: {
			color: theme.colors.gray[600]
		},
		categories: [
			'2021-06-01T00:00:00.000z',
			'2021-06-02T00:00:00.000z',
			'2021-06-03T00:00:00.000z',
			'2021-06-04T00:00:00.000z',
			'2021-06-05T00:00:00.000z',
			'2021-06-06T00:00:00.000z',
			'2021-06-07T00:00:00.000z',
		]
	},
	fill: {
		opacity: 0.3,
		type: 'gradient',
		gradient: {
			shade: 'dark',
			opacityFrom: 0.7,
			opacityTo: 0.3,
		}
	}
};
const series = [
	{
		name: 'series1',
		data: [31, 120, 10, 28, 61, 18, 109]
	}
];

export default function Dashboard() {
	return (
		<Flex direction="column" h="100vh">
			<Header />

			<Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
				<Sidebar />

				{/* Irá ocupar todo o conteúdo após o sidebar */}
				{/* minChildWidth -> Cada grid terá no minimo 320px */}
				<SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
					<Box
						p={["6", "8"]}
						bg="gray.800"
						borderRadius={8}
						pb="4"
					>
						<Text fontSize="lg" mb="4">Inscritos da semana</Text>
						<Chart options={options} series={series} type="area" height={160} />
					</Box>
					<Box
						p={["6", "8"]}
						bg="gray.800"
						borderRadius={8}
						pb="4"
					>
						<Text fontSize="lg" mb="4">Taxa de abertura</Text>
						<Chart options={options} series={series} type="area" height={160} />
					</Box>
				</SimpleGrid>
			</Flex>
		</Flex>
	);
}