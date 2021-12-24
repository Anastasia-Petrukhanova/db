USE [for_project]
GO

/****** Object:  Table [dbo].[Room_Extra]    Script Date: 24.12.2021 10:48:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Room_Extra](
	[id] [int] NOT NULL,
	[id_room] [int] NOT NULL,
	[id_extra] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Room_Extra]  WITH CHECK ADD FOREIGN KEY([id_extra])
REFERENCES [dbo].[Extra] ([id])
GO

ALTER TABLE [dbo].[Room_Extra]  WITH CHECK ADD FOREIGN KEY([id_room])
REFERENCES [dbo].[Room] ([id])
GO


