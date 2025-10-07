import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../services/api';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalytics();
        setData(res.data);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9fafb', }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Analytics Dashboard
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{tableLayout:'fixed',width: '100%'}}>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold',width:'70%'}}>Original URL</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Short ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Clicks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((u) => (
                  <TableRow key={u.shortId} hover>
                    <TableCell sx={{wordWrap:'normal', overflow:'clip'}}>{u.originalUrl}</TableCell>
                    <TableCell sx={{ color: '#1976d2' }}>
                        <Link to={`/${u.shortId}`}>
                            {u.shortId}
                        </Link>
                        </TableCell>
                    <TableCell>{u.clickCount}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No analytics data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Dashboard;
