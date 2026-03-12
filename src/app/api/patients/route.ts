import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Patient } from '@/types/patient';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const medicalIssue = searchParams.get('medical_issue') || '';
  const minAge = parseInt(searchParams.get('minAge') || '0');
  const maxAge = parseInt(searchParams.get('maxAge') || '150');
  const sortBy = searchParams.get('sortBy') || '';
  const order = searchParams.get('order') || 'asc';

  try {
    const filePath = path.join(process.cwd(), 'MOCK_DATA.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    let patients: Patient[] = JSON.parse(jsonData);

    // Filtering
    if (search) {
      const searchLower = search.toLowerCase();
      patients = patients.filter(p => 
        p.patient_name.toLowerCase().includes(searchLower) ||
        p.patient_id.toString().includes(searchLower)
      );
    }

    if (medicalIssue) {
      const issues = medicalIssue.split(',').map(i => i.toLowerCase());
      patients = patients.filter(p => issues.includes(p.medical_issue.toLowerCase()));
    }

    if (minAge || maxAge < 150) {
      patients = patients.filter(p => p.age >= minAge && p.age <= maxAge);
    }

    // Sorting
    if (sortBy) {
      patients.sort((a, b) => {
        let valA: any = (a as any)[sortBy];
        let valB: any = (b as any)[sortBy];

        if (sortBy === 'patient_id') {
           valA = a.patient_id;
           valB = b.patient_id;
        }

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Pagination
    const total = patients.length;
    const offset = (page - 1) * limit;
    const paginatedPatients = patients.slice(offset, offset + limit);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      patients: paginatedPatients,
      total,
      page,
      limit,
      totalPages: Math.max(1, totalPages)
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
