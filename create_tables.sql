use for_project
------ �������� ������� "������" -------
create table Client (
	[id] int not null,
	[familia] nvarchar(50) not null,
	[name] nvarchar(50) not null,
	[patronymic] nvarchar(50) null,
	[document_type] nvarchar(100) not null,
	[document_number] nvarchar(20) not null,
	[login] nvarchar(50) not null,
	primary key (id)
);
------- �������� ������� "���������� �� �����" ---------
create table Hotel (
	[id] int not null,
	[name] nvarchar(50) not null,
	[address] nvarchar(250) not null,
	primary key (id)
);
------- �������� ������� "���������" --------
create table Employee (
	[id] int not null, 
	[familia] nvarchar(50) not null,
	[name] nvarchar(50) not null,
	[patronymic] nvarchar(50) not null,
	[login] nvarchar(50) not null,
	primary key (id)
);
------- �������� ������� "�������������" -------
create table Extra (
	[id] int not null,
	[name] int not null,
	primary key (id)
);
------- �������� ������� "���������� � ������" -------
create table Room (
	[id] int not null,
	[number] smallint not null,
	[cost] int not null,
	[capacity] tinyint not null,
	[id_hotel] int null,
	[photo] nvarchar(200) not null,
	[status] nvarchar(100) not null,
	PRIMARY KEY (id),
	FOREIGN KEY (id_hotel) references Hotel(id)
);
------- �������� ������� "���������� � �������" --------
create table Room_Extra (
	[id] int not null,
	[id_room] int not null,
	[id_extra] int not null,
	primary key (id),
	foreign key (id_room) references Room(id),
	foreign key (id_extra) references Extra(id)
);
------- �������� ������� "������������" -------
create table Book (
	[id] int not null,
	[start] date not null,
	[end] date not null,
	[id_client] int not null,
	[id_room] int not null,
	primary key (id),
	foreign key (id_client) references Client(id),
	foreign key (id_room) references Room(id) 
);
------- �������� ������� "������� ��������" -------
create table History_opr (
	[id] int not null,
	[id_book] int not null,
	[id_employee] int null,
	[status] nvarchar(100) not null,
	[time] date not null,
	primary key (id),
	foreign key (id_book) references Book(id),
	foreign key (id_employee) references Employee(id)
);