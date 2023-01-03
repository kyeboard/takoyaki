use crate::Config;
use colored::*;

#[derive(Clone, Debug, PartialEq)]
pub struct Printable {
    pub count: usize,
    pub color: String
}

pub struct PrintableGrid {
    grid: Vec<Vec<Option<Printable>>>
}

impl PrintableGrid {
    pub fn new() -> Self {
        Self {
            grid: vec![]
        }
    }

    pub fn insert_at(&mut self, x: usize, y: usize, item: Printable) {
        // Extend the grid on the x axis
        if self.grid.len() < x + 1 {
            self.grid.resize_with(x + 1 , || vec![])
        }

        // Extend on the y axis
        if self.grid[x].len() < y + 1 {
            self.grid[x].resize_with(y + 1, || None)
        }

        // Insert the item
        self.grid[x].insert(y, Some(item))
    }

    pub fn get_at(&self, x: usize, y: usize) -> Option<Printable> {
        // Get the x axis array
        let x_axis = self.grid.get(x);

        // Check if it is valid
        match x_axis {
            Some(axis) => {
                // Get the item
                let item = axis.get(y);

                // Check if it exists
                match item {
                    Some(item) => {
                        item.clone()
                    },
                    None => {
                        None
                    }
                }
            },
            None => {
                None
            }
        }
    }

    pub fn pretty_print(&self, config: Config) {
        for x in &self.grid {
            for y in x {
                if y.is_none() {
                    continue;
                }

                let printable = y.as_ref().unwrap();
                let color = config.get_color(printable.count, printable.color.clone()).unwrap();

                if config.get_unicode().paint == "fg" {
                    print!(
                        "{}", 
                        config.get_unicode().unicode.truecolor(color.red() as u8, color.green() as u8, color.blue() as u8)
                    );
                } else {
                    print!(
                        "{}", 
                        config.get_unicode().unicode.on_truecolor(color.red() as u8, color.green() as u8, color.blue() as u8)
                    );
                }
            }

            println!();
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{Printable, PrintableGrid};

    #[test]
    pub fn printable_insert() {
        let mut printable = PrintableGrid::new();

        let item = Printable { count: 0, color: "".to_string() };
        let item2 = Printable { count: 0, color: "".to_string() };

        printable.insert_at(1, 1, item.clone());
        printable.insert_at(2, 2, item2.clone());

        assert_eq!(printable.get_at(1, 1).unwrap(), item);
        assert_eq!(printable.get_at(2, 2).unwrap(), item2);
    }

    #[test]
    pub fn invalid_index_should_return_none() {
        let printable = PrintableGrid::new();

        assert!(printable.get_at(1, 1).is_none());
    }
}
